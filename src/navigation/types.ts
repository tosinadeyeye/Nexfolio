import type { BottomTabScreenProps as BottomTabScreenPropsBase } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Splash: undefined;
  RoleSelection: undefined;
  Tabs: NavigatorScreenParams<ClientTabParamList | ProviderTabParamList> | undefined;
  LoginModalScreen: { role?: "provider" | "client" } | undefined;
  ProviderDetail: { providerId: number };
  BookingDetail: { bookingId: number };
};

// Client tabs
export type ClientTabParamList = {
  DiscoverTab: undefined;
  BookingsTab: undefined;
  ProfileTab: undefined;
};

// Provider tabs
export type ProviderTabParamList = {
  ProviderDashboardTab: undefined;
  ProviderPortfolioTab: undefined;
  ProviderBookingsTab: undefined;
  ProfileTab: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type ClientTabScreenProps<Screen extends keyof ClientTabParamList> = CompositeScreenProps<
  BottomTabScreenPropsBase<ClientTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProviderTabScreenProps<Screen extends keyof ProviderTabParamList> = CompositeScreenProps<
  BottomTabScreenPropsBase<ProviderTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

// Backward compatibility
export type BottomTabParamList = ClientTabParamList;
export type BottomTabScreenProps<Screen extends keyof ClientTabParamList> = ClientTabScreenProps<Screen>;
