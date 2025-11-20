import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppType } from "../index";
import { db } from "../db";
import {
  setupProviderRequestSchema,
  getProvidersQuerySchema,
} from "../../../shared/contracts";

const providerRouter = new Hono<AppType>();

// Setup provider profile
providerRouter.post("/setup", zValidator("json", setupProviderRequestSchema), async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const data = c.req.valid("json");

  try {
    // Get profile
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
      include: { provider: true },
    });

    if (!profile) {
      return c.json({ error: "Profile not found. Please create a profile first." }, 404);
    }

    if (profile.role !== "provider") {
      return c.json({ error: "Only providers can set up provider profiles" }, 403);
    }

    // Create or update provider
    const providerData = {
      serviceTypes: JSON.stringify(data.serviceTypes),
      pricing: data.pricing ? JSON.stringify(data.pricing) : null,
      travelRadius: data.travelRadius,
      socialLinks: data.socialLinks ? JSON.stringify(data.socialLinks) : null,
      availability: data.availability ? JSON.stringify(data.availability) : null,
    };

    let provider;
    if (profile.provider) {
      // Update existing provider
      provider = await db.provider.update({
        where: { profileId: profile.id },
        data: providerData,
      });
    } else {
      // Create new provider
      provider = await db.provider.create({
        data: {
          ...providerData,
          profileId: profile.id,
        },
      });
    }

    return c.json({ success: true, providerId: provider.id });
  } catch (error) {
    console.error("Error setting up provider:", error);
    return c.json({ error: "Failed to setup provider" }, 500);
  }
});

// Get all providers with optional filters
providerRouter.get("/", zValidator("query", getProvidersQuerySchema), async (c) => {
  const query = c.req.valid("query");

  try {
    const providers = await db.provider.findMany({
      include: {
        profile: {
          select: {
            handle: true,
            bio: true,
            location: true,
          },
        },
      },
      orderBy: {
        averageRating: "desc",
      },
    });

    // Apply filters
    let filteredProviders = providers;

    if (query.serviceType) {
      filteredProviders = filteredProviders.filter((provider) => {
        const serviceTypes = JSON.parse(provider.serviceTypes);
        return serviceTypes.includes(query.serviceType);
      });
    }

    if (query.location) {
      filteredProviders = filteredProviders.filter(
        (provider) => provider.profile.location?.toLowerCase().includes(query.location!.toLowerCase())
      );
    }

    return c.json(filteredProviders);
  } catch (error) {
    console.error("Error fetching providers:", error);
    return c.json({ error: "Failed to fetch providers" }, 500);
  }
});

// Get single provider by ID
providerRouter.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));

  if (isNaN(id)) {
    return c.json({ error: "Invalid provider ID" }, 400);
  }

  try {
    const provider = await db.provider.findUnique({
      where: { id },
      include: {
        profile: {
          select: {
            handle: true,
            bio: true,
            location: true,
            phoneNumber: true,
          },
        },
        portfolioItems: {
          select: {
            id: true,
            imageUrl: true,
            title: true,
            description: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        providerReviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            client: {
              select: {
                handle: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });

    if (!provider) {
      return c.json({ error: "Provider not found" }, 404);
    }

    return c.json({
      ...provider,
      providerReviews: provider.providerReviews.map((review) => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Error fetching provider:", error);
    return c.json({ error: "Failed to fetch provider" }, 500);
  }
});

export default providerRouter;
