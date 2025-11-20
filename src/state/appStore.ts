import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GetProfileResponse } from "../../shared/contracts";

interface AppState {
  // Auth state
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;

  // Profile state
  profile: GetProfileResponse | null;
  setProfile: (profile: GetProfileResponse | null) => void;
  clearProfile: () => void;

  // Helpers
  isProvider: () => boolean;
  isClient: () => boolean;
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      hasCompletedOnboarding: false,
      profile: null,

      // Actions
      setHasCompletedOnboarding: (completed) => set({ hasCompletedOnboarding: completed }),

      setProfile: (profile) => set({ profile }),

      clearProfile: () => set({ profile: null }),

      isProvider: () => {
        const profile = get().profile;
        return profile?.role === "provider";
      },

      isClient: () => {
        const profile = get().profile;
        return profile?.role === "client";
      },

      reset: () => set({
        hasCompletedOnboarding: false,
        profile: null
      }),
    }),
    {
      name: "nexfolio-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        profile: state.profile,
      }),
    }
  )
);
