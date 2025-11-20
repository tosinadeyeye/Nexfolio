import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppType } from "../index";
import { db } from "../db";
import {
  createProfileRequestSchema,
  createProfileResponseSchema,
  getProfileResponseSchema,
} from "../../../shared/contracts";

const profileRouter = new Hono<AppType>();

// Create a new profile
profileRouter.post("/create", zValidator("json", createProfileRequestSchema), async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const data = c.req.valid("json");

  try {
    // Check if profile already exists
    const existing = await db.profile.findUnique({
      where: { userId: user.id },
    });

    if (existing) {
      return c.json({ error: "Profile already exists" }, 400);
    }

    // Check if handle is taken
    const handleTaken = await db.profile.findUnique({
      where: { handle: data.handle },
    });

    if (handleTaken) {
      return c.json({ error: "Handle already taken" }, 400);
    }

    // Create profile
    const profile = await db.profile.create({
      data: {
        userId: user.id,
        handle: data.handle,
        role: data.role,
        bio: data.bio,
        location: data.location,
        phoneNumber: data.phoneNumber,
      },
    });

    return c.json({ success: true, profileId: profile.id });
  } catch (error) {
    console.error("Error creating profile:", error);
    return c.json({ error: "Failed to create profile" }, 500);
  }
});

// Get current user's profile
profileRouter.get("/", async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
      include: {
        provider: true,
      },
    });

    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    return c.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return c.json({ error: "Failed to fetch profile" }, 500);
  }
});

export default profileRouter;
