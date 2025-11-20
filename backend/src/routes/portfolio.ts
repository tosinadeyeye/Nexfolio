import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppType } from "../index";
import { db } from "../db";
import {
  addPortfolioItemRequestSchema,
} from "../../../shared/contracts";

const portfolioRouter = new Hono<AppType>();

// Add portfolio item
portfolioRouter.post("/add", zValidator("json", addPortfolioItemRequestSchema), async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const data = c.req.valid("json");

  try {
    // Get provider
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
      include: { provider: true },
    });

    if (!profile?.provider) {
      return c.json({ error: "Provider profile not found" }, 404);
    }

    // Create portfolio item
    const item = await db.portfolioItem.create({
      data: {
        providerId: profile.provider.id,
        imageUrl: data.imageUrl,
        title: data.title,
        description: data.description,
      },
    });

    return c.json({ success: true, itemId: item.id });
  } catch (error) {
    console.error("Error adding portfolio item:", error);
    return c.json({ error: "Failed to add portfolio item" }, 500);
  }
});

// Delete portfolio item
portfolioRouter.delete("/:id", async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const itemId = parseInt(c.req.param("id"));

  if (isNaN(itemId)) {
    return c.json({ error: "Invalid item ID" }, 400);
  }

  try {
    // Get provider
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
      include: { provider: true },
    });

    if (!profile?.provider) {
      return c.json({ error: "Provider profile not found" }, 404);
    }

    // Check ownership
    const item = await db.portfolioItem.findUnique({
      where: { id: itemId },
    });

    if (!item || item.providerId !== profile.provider.id) {
      return c.json({ error: "Portfolio item not found or unauthorized" }, 404);
    }

    // Delete item
    await db.portfolioItem.delete({
      where: { id: itemId },
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    return c.json({ error: "Failed to delete portfolio item" }, 500);
  }
});

export default portfolioRouter;
