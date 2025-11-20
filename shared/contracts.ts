// contracts.ts
// Shared API contracts (schemas and types) used by both the server and the app.
// Import in the app as: `import { type GetProfileResponse } from "@shared/contracts"`
// Import in the server as: `import { createProfileRequestSchema } from "@shared/contracts"`

import { z } from "zod";

// Profile endpoints

// POST /api/profile/create
export const createProfileRequestSchema = z.object({
  handle: z.string().min(3),
  role: z.enum(["provider", "client"]),
  bio: z.string().optional(),
  location: z.string().optional(),
  phoneNumber: z.string().optional(),
});
export type CreateProfileRequest = z.infer<typeof createProfileRequestSchema>;
export const createProfileResponseSchema = z.object({
  success: z.boolean(),
  profileId: z.number(),
});
export type CreateProfileResponse = z.infer<typeof createProfileResponseSchema>;

// GET /api/profile
export const getProfileResponseSchema = z.object({
  id: z.number(),
  handle: z.string(),
  userId: z.string(),
  role: z.string(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  provider: z
    .object({
      id: z.number(),
      serviceTypes: z.string(),
      pricing: z.string().nullable(),
      travelRadius: z.number().nullable(),
      socialLinks: z.string().nullable(),
      availability: z.string().nullable(),
      subscriptionTier: z.string(),
      isVerified: z.boolean(),
      totalBookings: z.number(),
      averageRating: z.number(),
    })
    .nullable(),
});
export type GetProfileResponse = z.infer<typeof getProfileResponseSchema>;

// Provider endpoints

// POST /api/provider/setup
export const setupProviderRequestSchema = z.object({
  profession: z.string().optional(),
  serviceTypes: z.array(z.string()).min(1),
  pricing: z.record(z.string(), z.number()).optional(),
  travelRadius: z.number().optional(),
  socialLinks: z.record(z.string(), z.string()).optional(),
  availability: z.any().optional(),
});
export type SetupProviderRequest = z.infer<typeof setupProviderRequestSchema>;
export const setupProviderResponseSchema = z.object({
  success: z.boolean(),
  providerId: z.number(),
});
export type SetupProviderResponse = z.infer<typeof setupProviderResponseSchema>;

// GET /api/providers
export const getProvidersQuerySchema = z.object({
  search: z.string().optional(), // Search across profession, name, bio, service types
  serviceType: z.string().optional(),
  location: z.string().optional(),
  radius: z.string().optional(),
});
export type GetProvidersQuery = z.infer<typeof getProvidersQuerySchema>;
export const getProvidersResponseSchema = z.array(
  z.object({
    id: z.number(),
    profileId: z.number(),
    profession: z.string().nullable(),
    profile: z.object({
      handle: z.string(),
      bio: z.string().nullable(),
      location: z.string().nullable(),
    }),
    serviceTypes: z.string(),
    subscriptionTier: z.string(),
    averageRating: z.number(),
    totalBookings: z.number(),
    isVerified: z.boolean(),
  })
);
export type GetProvidersResponse = z.infer<typeof getProvidersResponseSchema>;

// GET /api/provider/:id
export const getProviderResponseSchema = z.object({
  id: z.number(),
  profileId: z.number(),
  profession: z.string().nullable(),
  serviceTypes: z.string(),
  pricing: z.string().nullable(),
  travelRadius: z.number().nullable(),
  socialLinks: z.string().nullable(),
  availability: z.string().nullable(),
  subscriptionTier: z.string(),
  isVerified: z.boolean(),
  totalBookings: z.number(),
  averageRating: z.number(),
  profile: z.object({
    handle: z.string(),
    bio: z.string().nullable(),
    location: z.string().nullable(),
    phoneNumber: z.string().nullable(),
  }),
  portfolioItems: z.array(
    z.object({
      id: z.number(),
      imageUrl: z.string(),
      title: z.string().nullable(),
      description: z.string().nullable(),
    })
  ),
  providerReviews: z.array(
    z.object({
      id: z.number(),
      rating: z.number(),
      comment: z.string().nullable(),
      createdAt: z.string(),
      client: z.object({
        handle: z.string(),
      }),
    })
  ),
});
export type GetProviderResponse = z.infer<typeof getProviderResponseSchema>;

// Portfolio endpoints

// POST /api/portfolio/add
export const addPortfolioItemRequestSchema = z.object({
  imageUrl: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
});
export type AddPortfolioItemRequest = z.infer<typeof addPortfolioItemRequestSchema>;
export const addPortfolioItemResponseSchema = z.object({
  success: z.boolean(),
  itemId: z.number(),
});
export type AddPortfolioItemResponse = z.infer<typeof addPortfolioItemResponseSchema>;

// DELETE /api/portfolio/:id
export const deletePortfolioItemResponseSchema = z.object({
  success: z.boolean(),
});
export type DeletePortfolioItemResponse = z.infer<typeof deletePortfolioItemResponseSchema>;

// Booking endpoints

// POST /api/booking/create
export const createBookingRequestSchema = z.object({
  providerId: z.number(),
  serviceType: z.string(),
  bookingDate: z.string(),
  bookingTime: z.string(),
  isTrial: z.boolean(),
  price: z.number(),
  notes: z.string().optional(),
  location: z.string().optional(),
});
export type CreateBookingRequest = z.infer<typeof createBookingRequestSchema>;
export const createBookingResponseSchema = z.object({
  success: z.boolean(),
  bookingId: z.number(),
});
export type CreateBookingResponse = z.infer<typeof createBookingResponseSchema>;

// GET /api/bookings
export const getBookingsResponseSchema = z.array(
  z.object({
    id: z.number(),
    serviceType: z.string(),
    bookingDate: z.string(),
    bookingTime: z.string(),
    status: z.string(),
    isTrial: z.boolean(),
    price: z.number(),
    notes: z.string().nullable(),
    location: z.string().nullable(),
    provider: z.object({
      id: z.number(),
      profile: z.object({
        handle: z.string(),
        location: z.string().nullable(),
      }),
    }),
    client: z.object({
      handle: z.string(),
    }),
  })
);
export type GetBookingsResponse = z.infer<typeof getBookingsResponseSchema>;

// PATCH /api/booking/:id/status
export const updateBookingStatusRequestSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});
export type UpdateBookingStatusRequest = z.infer<typeof updateBookingStatusRequestSchema>;
export const updateBookingStatusResponseSchema = z.object({
  success: z.boolean(),
});
export type UpdateBookingStatusResponse = z.infer<typeof updateBookingStatusResponseSchema>;

// Review endpoints

// POST /api/review/create
export const createReviewRequestSchema = z.object({
  bookingId: z.number(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});
export type CreateReviewRequest = z.infer<typeof createReviewRequestSchema>;
export const createReviewResponseSchema = z.object({
  success: z.boolean(),
  reviewId: z.number(),
});
export type CreateReviewResponse = z.infer<typeof createReviewResponseSchema>;

// POST /api/upload/image
export const uploadImageRequestSchema = z.object({
  image: z.instanceof(File),
});
export type UploadImageRequest = z.infer<typeof uploadImageRequestSchema>;
export const uploadImageResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  url: z.string(),
  filename: z.string(),
});
export type UploadImageResponse = z.infer<typeof uploadImageResponseSchema>;

// Subscription endpoints

// Subscription tier enum
export const subscriptionTierSchema = z.enum(["free", "starter", "pro", "elite"]);
export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;

// Subscription tier features and pricing
export const SUBSCRIPTION_TIERS = {
  free: {
    name: "Free",
    price: 0,
    features: [
      "Basic profile",
      "Up to 5 portfolio items",
      "Standard listing",
      "Basic analytics",
    ],
    portfolioLimit: 5,
    priority: 0,
  },
  starter: {
    name: "Starter",
    price: 9.99,
    features: [
      "All Free features",
      "Up to 15 portfolio items",
      "Priority listing",
      "Advanced analytics",
      "Custom branding",
    ],
    portfolioLimit: 15,
    priority: 1,
  },
  pro: {
    name: "Pro",
    price: 24.99,
    features: [
      "All Starter features",
      "Unlimited portfolio items",
      "Top priority listing",
      "Featured badge",
      "Premium analytics",
      "Priority support",
      "Custom booking forms",
    ],
    portfolioLimit: -1, // unlimited
    priority: 2,
  },
  elite: {
    name: "Elite",
    price: 49.99,
    features: [
      "All Pro features",
      "Verified badge",
      "Featured on homepage",
      "Dedicated account manager",
      "API access",
      "White-label options",
      "Advanced integrations",
    ],
    portfolioLimit: -1, // unlimited
    priority: 3,
  },
} as const;

// POST /api/subscription/upgrade
export const upgradeSubscriptionRequestSchema = z.object({
  tier: subscriptionTierSchema,
  paymentMethodId: z.string().optional(), // For future Stripe integration
});
export type UpgradeSubscriptionRequest = z.infer<typeof upgradeSubscriptionRequestSchema>;
export const upgradeSubscriptionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  subscriptionTier: subscriptionTierSchema,
});
export type UpgradeSubscriptionResponse = z.infer<typeof upgradeSubscriptionResponseSchema>;

// POST /api/subscription/cancel
export const cancelSubscriptionResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type CancelSubscriptionResponse = z.infer<typeof cancelSubscriptionResponseSchema>;

// GET /api/subscription/current
export const getCurrentSubscriptionResponseSchema = z.object({
  subscriptionTier: subscriptionTierSchema,
  features: z.array(z.string()),
  portfolioLimit: z.number(),
  currentPortfolioCount: z.number(),
  price: z.number(),
});
export type GetCurrentSubscriptionResponse = z.infer<typeof getCurrentSubscriptionResponseSchema>;
