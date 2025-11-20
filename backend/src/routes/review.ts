import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppType } from "../index";
import { db } from "../db";
import {
  createReviewRequestSchema,
} from "../../../shared/contracts";

const reviewRouter = new Hono<AppType>();

// Create a review
reviewRouter.post("/create", zValidator("json", createReviewRequestSchema), async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const data = c.req.valid("json");

  try {
    // Get client profile
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    // Get booking and verify ownership
    const booking = await db.booking.findUnique({
      where: { id: data.bookingId },
      include: {
        review: true,
      },
    });

    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }

    if (booking.clientId !== profile.id) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    if (booking.status !== "completed") {
      return c.json({ error: "Can only review completed bookings" }, 400);
    }

    if (booking.review) {
      return c.json({ error: "Booking already reviewed" }, 400);
    }

    // Create review
    const review = await db.review.create({
      data: {
        bookingId: data.bookingId,
        providerId: booking.providerId,
        clientId: profile.id,
        rating: data.rating,
        comment: data.comment,
      },
    });

    // Update provider's average rating
    const provider = await db.provider.findUnique({
      where: { id: booking.providerId },
      include: {
        providerReviews: true,
      },
    });

    if (provider) {
      const totalRating = provider.providerReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / provider.providerReviews.length;

      await db.provider.update({
        where: { id: booking.providerId },
        data: {
          averageRating,
          totalBookings: provider.totalBookings + 1,
        },
      });
    }

    return c.json({ success: true, reviewId: review.id });
  } catch (error) {
    console.error("Error creating review:", error);
    return c.json({ error: "Failed to create review" }, 500);
  }
});

export default reviewRouter;
