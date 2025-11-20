import { Hono } from "hono";
import { db } from "../db";
import type { AppType } from "../index";
import {
  upgradeSubscriptionRequestSchema,
  upgradeSubscriptionResponseSchema,
  cancelSubscriptionResponseSchema,
  getCurrentSubscriptionResponseSchema,
  SUBSCRIPTION_TIERS,
  type SubscriptionTier,
} from "../../../shared/contracts";

export const subscriptionRouter = new Hono<AppType>();

// GET /api/subscription/current - Get current subscription details
subscriptionRouter.get("/current", async (c) => {
  try {
    const session = c.get("user");
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user's profile
    const profile = await db.profile.findUnique({
      where: { userId: session.id },
      include: {
        provider: {
          include: {
            portfolioItems: true,
          },
        },
      },
    });

    if (!profile || !profile.provider) {
      return c.json({ error: "Provider profile not found" }, 404);
    }

    const provider = profile.provider;
    const tier = provider.subscriptionTier as SubscriptionTier;
    const tierInfo = SUBSCRIPTION_TIERS[tier];

    const response = {
      subscriptionTier: tier,
      features: tierInfo.features,
      portfolioLimit: tierInfo.portfolioLimit,
      currentPortfolioCount: provider.portfolioItems.length,
      price: tierInfo.price,
    };

    return c.json(response);
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return c.json({ error: "Failed to fetch subscription" }, 500);
  }
});

// POST /api/subscription/upgrade - Upgrade subscription tier
subscriptionRouter.post("/upgrade", async (c) => {
  try {
    const session = c.get("user");
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const validation = upgradeSubscriptionRequestSchema.safeParse(body);

    if (!validation.success) {
      return c.json({ error: "Invalid request", issues: validation.error.issues }, 400);
    }

    const { tier } = validation.data;

    // Get user's profile
    const profile = await db.profile.findUnique({
      where: { userId: session.id },
      include: { provider: true },
    });

    if (!profile || !profile.provider) {
      return c.json({ error: "Provider profile not found" }, 404);
    }

    const provider = profile.provider;
    const currentTier = provider.subscriptionTier as SubscriptionTier;
    const newTierInfo = SUBSCRIPTION_TIERS[tier];
    const currentTierInfo = SUBSCRIPTION_TIERS[currentTier];

    // Determine action type
    let action: string;
    if (tier === "free") {
      action = "cancel";
    } else if (newTierInfo.priority > currentTierInfo.priority) {
      action = "upgrade";
    } else if (newTierInfo.priority < currentTierInfo.priority) {
      action = "downgrade";
    } else {
      return c.json({ error: "Already on this tier" }, 400);
    }

    // Update provider subscription
    const updatedProvider = await db.provider.update({
      where: { id: provider.id },
      data: {
        subscriptionTier: tier,
        subscriptionStartDate: new Date(),
        subscriptionEndDate: tier === "free" ? null : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Create subscription history record
    await db.subscriptionHistory.create({
      data: {
        providerId: provider.id,
        tier,
        action,
        amount: newTierInfo.price,
        startDate: new Date(),
      },
    });

    const response = {
      success: true,
      message: `Successfully ${action}d to ${newTierInfo.name} tier`,
      subscriptionTier: tier,
    };

    return c.json(response);
  } catch (error) {
    console.error("Error upgrading subscription:", error);
    return c.json({ error: "Failed to upgrade subscription" }, 500);
  }
});

// POST /api/subscription/cancel - Cancel subscription (downgrade to free)
subscriptionRouter.post("/cancel", async (c) => {
  try {
    const session = c.get("user");
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user's profile
    const profile = await db.profile.findUnique({
      where: { userId: session.id },
      include: { provider: true },
    });

    if (!profile || !profile.provider) {
      return c.json({ error: "Provider profile not found" }, 404);
    }

    const provider = profile.provider;

    // Update provider subscription to free
    await db.provider.update({
      where: { id: provider.id },
      data: {
        subscriptionTier: "free",
        subscriptionStartDate: new Date(),
        subscriptionEndDate: null,
      },
    });

    // Create subscription history record
    await db.subscriptionHistory.create({
      data: {
        providerId: provider.id,
        tier: "free",
        action: "cancel",
        amount: 0,
        startDate: new Date(),
      },
    });

    const response = {
      success: true,
      message: "Subscription cancelled successfully. You are now on the Free tier.",
    };

    return c.json(response);
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    return c.json({ error: "Failed to cancel subscription" }, 500);
  }
});

// GET /api/subscription/history - Get subscription history
subscriptionRouter.get("/history", async (c) => {
  try {
    const session = c.get("user");
    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Get user's profile
    const profile = await db.profile.findUnique({
      where: { userId: session.id },
      include: { provider: true },
    });

    if (!profile || !profile.provider) {
      return c.json({ error: "Provider profile not found" }, 404);
    }

    const history = await db.subscriptionHistory.findMany({
      where: { providerId: profile.provider.id },
      orderBy: { createdAt: "desc" },
    });

    return c.json(history);
  } catch (error) {
    console.error("Error fetching subscription history:", error);
    return c.json({ error: "Failed to fetch subscription history" }, 500);
  }
});
