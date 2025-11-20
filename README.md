# Nexfolio

A modern mobile marketplace connecting service providers with clients for trial-based bookings.

## Overview

Nexfolio is a beautiful, full-stack mobile application built with Expo and React Native that enables professionals (makeup artists, hair stylists, electricians, consultants, etc.) to showcase their work and offer trial services to potential clients.

## Features

### Core Functionality
- **Dual User Roles**: Completely separate experiences for providers and clients
  - **Client View**: Discover providers, book services, manage bookings, view profile
  - **Provider View**: Dashboard with stats, portfolio management, client bookings, profile
- **Role-Based Navigation**: Automatic routing based on user role
- **Beautiful Onboarding**: Splash screen with logo and smooth role selection flow
- **Provider Discovery**: Browse professionals by service type and location
- **Booking System**: Schedule trial sessions with calendar integration
- **Portfolio Management**: Providers can showcase their work with image galleries
- **Review System**: Rate and review completed services
- **Real-time Updates**: Track booking status (pending, confirmed, completed, cancelled)

### Design
- **Brand Colors**:
  - Primary Purple: #7546EA
  - Primary Pink: #FF67FF
  - Gradient backgrounds throughout
- **Modern UI**: Clean cards, soft shadows, rounded corners
- **Smooth Animations**: Haptic feedback and smooth transitions
- **Responsive**: Works beautifully on all screen sizes

## Tech Stack

### Frontend
- **Expo SDK 53** with React Native 0.79.2
- **TypeScript** for type safety
- **Nativewind** (TailwindCSS for React Native) for styling
- **React Navigation 7** with native stack and bottom tabs
- **Zustand** for state management
- **TanStack Query** for server state
- **Better Auth** (@better-auth/expo) for authentication
- **Lucide React Native** for icons
- **Expo Linear Gradient** for beautiful gradients

### Backend
- **Bun** runtime
- **Hono** web framework
- **Prisma ORM** with SQLite database
- **Better Auth** for authentication
- **Zod** for validation and type safety

## Project Structure

```
/home/user/workspace/
├── src/
│   ├── screens/           # All app screens
│   │   ├── SplashScreen.tsx
│   │   ├── RoleSelectionScreen.tsx
│   │   # Client Screens
│   │   ├── DiscoverScreen.tsx
│   │   ├── BookingsScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   # Provider Screens
│   │   ├── ProviderDashboardScreen.tsx
│   │   ├── ProviderPortfolioScreen.tsx
│   │   ├── ProviderBookingsScreen.tsx
│   │   # Shared Detail Screens
│   │   ├── ProviderDetailScreen.tsx
│   │   ├── BookingDetailScreen.tsx
│   │   └── LoginModalScreen.tsx
│   ├── components/        # Reusable components
│   │   └── LoginWithEmailPassword.tsx
│   ├── navigation/        # Navigation setup
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   ├── state/            # Zustand stores
│   │   └── appStore.ts
│   ├── lib/              # Utilities
│   │   ├── api.ts
│   │   ├── authClient.ts
│   │   ├── useSession.tsx
│   │   └── queryClient.ts
│   └── utils/
│       └── cn.ts
├── backend/
│   ├── src/
│   │   ├── index.ts      # Main server file
│   │   ├── auth.ts       # Better Auth configuration
│   │   ├── db.ts         # Prisma client
│   │   ├── env.ts        # Environment validation
│   │   └── routes/       # API routes
│   │       ├── profile.ts
│   │       ├── provider.ts
│   │       ├── portfolio.ts
│   │       ├── booking.ts
│   │       ├── review.ts
│   │       └── upload.ts
│   └── prisma/
│       ├── schema.prisma # Database schema
│       └── dev.db        # SQLite database
├── shared/
│   └── contracts.ts      # Shared types between frontend and backend
└── App.tsx              # App entry point
```

## Database Schema

### Models
- **User**: Authentication and basic user info
- **Profile**: Extended profile information (role: provider/client)
- **Provider**: Provider-specific data (services, pricing, ratings)
- **PortfolioItem**: Provider's work showcase
- **Booking**: Service bookings (trial and full)
- **Review**: Client reviews for providers

## API Endpoints

### Authentication
- `POST /api/auth/sign-in` - Sign in
- `POST /api/auth/sign-up` - Sign up
- `POST /api/auth/sign-out` - Sign out

### Profile
- `POST /api/profile/create` - Create user profile
- `GET /api/profile` - Get current user's profile

### Provider
- `POST /api/provider/setup` - Setup provider profile
- `GET /api/provider` - Get all providers (with filters)
- `GET /api/provider/:id` - Get specific provider details

### Portfolio
- `POST /api/portfolio/add` - Add portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item

### Booking
- `POST /api/booking/create` - Create a booking
- `GET /api/bookings` - Get user's bookings
- `PATCH /api/booking/:id/status` - Update booking status

### Review
- `POST /api/review/create` - Create a review

### Upload
- `POST /api/upload/image` - Upload an image

## Getting Started

Both the frontend and backend servers are running automatically on the Vibecode platform:
- Frontend: Port 8081 (Expo)
- Backend: Port 3000 (Hono)
- Database UI: Port 3001 (Prisma Studio)

## Environment Variables

Backend environment variables are configured in `/home/user/workspace/backend/.env`:
- `DATABASE_URL` - SQLite database path
- `BETTER_AUTH_SECRET` - Authentication secret
- `BACKEND_URL` - Backend server URL (auto-configured)

## Next Steps

### Features to Add
1. **Provider Dashboard**: Analytics and earnings tracking
2. **Search & Filters**: Advanced provider search
3. **Real-time Chat**: Provider-client messaging
4. **Payment Integration**: Stripe for trial and full bookings
5. **Push Notifications**: Booking reminders and updates
6. **Provider Verification**: Badge system for verified professionals
7. **Subscription Tiers**: Free, Starter, Pro, Elite plans
8. **Calendar Integration**: Sync with device calendar
9. **Video Calls**: Virtual consultations
10. **Social Sharing**: Share provider profiles

### Improvements
- Add loading states and skeletons
- Implement error boundaries
- Add image optimization
- Implement infinite scroll for provider lists
- Add pull-to-refresh functionality
- Implement deep linking
- Add analytics tracking

## Development

### Type Checking
```bash
bun run typecheck
```

### Linting
```bash
bun run lint
```

### Format Code
```bash
bun run format
```

## Notes

- The app uses a beautiful purple-to-pink gradient theme throughout
- **Role-based navigation**: The app automatically shows different screens based on user role
  - Providers see: Dashboard → Portfolio → Bookings → Profile tabs
  - Clients see: Discover → Bookings → Profile tabs
- All navigation uses type-safe navigation props
- State management is minimal and focused (Zustand for app state, TanStack Query for server state)
- The backend API is fully typed and validated with Zod
- Authentication is handled by Better Auth with Expo support
- Separate navigation type systems for ClientTabParamList and ProviderTabParamList ensure type safety

---

Built with love for the Vibecode platform. 💜💖
