import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import type { AppType } from "../index";
import { db } from "../db";
import {
  createBookingRequestSchema,
  updateBookingStatusRequestSchema,
} from "../../../shared/contracts";

const bookingRouter = new Hono<AppType>();

// Create a new booking
bookingRouter.post("/create", zValidator("json", createBookingRequestSchema), async (c) => {
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

    // Verify provider exists
    const provider = await db.provider.findUnique({
      where: { id: data.providerId },
    });

    if (!provider) {
      return c.json({ error: "Provider not found" }, 404);
    }

    // Create booking
    const booking = await db.booking.create({
      data: {
        providerId: data.providerId,
        clientId: profile.id,
        serviceType: data.serviceType,
        bookingDate: new Date(data.bookingDate),
        bookingTime: data.bookingTime,
        isTrial: data.isTrial,
        price: data.price,
        notes: data.notes,
        location: data.location,
      },
    });

    return c.json({ success: true, bookingId: booking.id });
  } catch (error) {
    console.error("Error creating booking:", error);
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

// Get user's bookings
bookingRouter.get("/", async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
      include: { provider: true },
    });

    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    let bookings;

    // If user is a provider, get their provider bookings
    if (profile.provider) {
      bookings = await db.booking.findMany({
        where: { providerId: profile.provider.id },
        include: {
          provider: {
            include: {
              profile: {
                select: {
                  handle: true,
                  location: true,
                },
              },
            },
          },
          client: {
            select: {
              handle: true,
            },
          },
        },
        orderBy: {
          bookingDate: "desc",
        },
      });
    } else {
      // Get client bookings
      bookings = await db.booking.findMany({
        where: { clientId: profile.id },
        include: {
          provider: {
            include: {
              profile: {
                select: {
                  handle: true,
                  location: true,
                },
              },
            },
          },
          client: {
            select: {
              handle: true,
            },
          },
        },
        orderBy: {
          bookingDate: "desc",
        },
      });
    }

    return c.json(
      bookings.map((booking) => ({
        ...booking,
        bookingDate: booking.bookingDate.toISOString(),
      }))
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return c.json({ error: "Failed to fetch bookings" }, 500);
  }
});

// Update booking status
bookingRouter.patch("/:id/status", zValidator("json", updateBookingStatusRequestSchema), async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const bookingId = parseInt(c.req.param("id"));
  const data = c.req.valid("json");

  if (isNaN(bookingId)) {
    return c.json({ error: "Invalid booking ID" }, 400);
  }

  try {
    const profile = await db.profile.findUnique({
      where: { userId: user.id },
      include: { provider: true },
    });

    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    // Get booking and verify ownership
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }

    // Check if user is the provider or client
    const isProvider = profile.provider?.id === booking.providerId;
    const isClient = profile.id === booking.clientId;

    if (!isProvider && !isClient) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    // Update booking
    await db.booking.update({
      where: { id: bookingId },
      data: { status: data.status },
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Error updating booking status:", error);
    return c.json({ error: "Failed to update booking status" }, 500);
  }
});

export default bookingRouter;
