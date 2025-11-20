import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { GetProfileResponse } from "../../shared/contracts";

interface UserState {
  profile: GetProfileResponse | null;
  setProfile: (profile: GetProfileResponse | null) => void;
  clearProfile: () => void;
  isProvider: () => boolean;
  isClient: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,

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
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
