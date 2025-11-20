import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Search, Calendar, User, LayoutDashboard, Briefcase } from "lucide-react-native";

import type { ClientTabParamList, ProviderTabParamList, RootStackParamList } from "@/navigation/types";
import { useAppStore } from "@/state/appStore";
import SplashScreen from "@/screens/SplashScreen";
import RoleSelectionScreen from "@/screens/RoleSelectionScreen";
import LoginModalScreen from "@/screens/LoginModalScreen";
// Client screens
import DiscoverScreen from "@/screens/DiscoverScreen";
import BookingsScreen from "@/screens/BookingsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
// Provider screens
import ProviderDashboardScreen from "@/screens/ProviderDashboardScreen";
import ProviderPortfolioScreen from "@/screens/ProviderPortfolioScreen";
import ProviderBookingsScreen from "@/screens/ProviderBookingsScreen";
// Detail screens
import ProviderDetailScreen from "@/screens/ProviderDetailScreen";
import BookingDetailScreen from "@/screens/BookingDetailScreen";
import SubscriptionScreen from "@/screens/SubscriptionScreen";

/**
 * RootStackNavigator
 * Main navigation structure for Nexfolio
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Onboarding Flow */}
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="RoleSelection" component={RoleSelectionScreen} />

      {/* Main App - Role-based tabs */}
      <RootStack.Screen name="Tabs" component={RoleBasedTabNavigator} />

      {/* Modals & Detail Screens */}
      <RootStack.Screen
        name="LoginModalScreen"
        component={LoginModalScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Sign In",
        }}
      />
      <RootStack.Screen
        name="ProviderDetail"
        component={ProviderDetailScreen}
        options={{
          headerShown: true,
          title: "Provider Details",
          headerBackTitle: "Back",
        }}
      />
      <RootStack.Screen
        name="BookingDetail"
        component={BookingDetailScreen}
        options={{
          headerShown: true,
          title: "Booking Details",
          headerBackTitle: "Back",
        }}
      />
      <RootStack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          headerShown: true,
          title: "Subscription",
          headerBackTitle: "Back",
        }}
      />
    </RootStack.Navigator>
  );
};

/**
 * RoleBasedTabNavigator
 * Switches between client and provider tabs based on user role
 */
const RoleBasedTabNavigator = () => {
  const profile = useAppStore((s) => s.profile);
  const isProvider = profile?.role === "provider";

  if (isProvider) {
    return <ProviderTabNavigator />;
  }

  return <ClientTabNavigator />;
};

/**
 * ClientTabNavigator
 * Bottom tabs for client users
 */
const ClientTab = createBottomTabNavigator<ClientTabParamList>();
const ClientTabNavigator = () => {
  return (
    <ClientTab.Navigator
      initialRouteName="DiscoverTab"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          height: 88,
          paddingBottom: 32,
          paddingTop: 8,
        },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={95} style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: "#7546EA",
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
      screenListeners={() => ({
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      })}
    >
      <ClientTab.Screen
        name="DiscoverTab"
        component={DiscoverScreen}
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} strokeWidth={2.5} />,
        }}
      />
      <ClientTab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} strokeWidth={2.5} />,
        }}
      />
      <ClientTab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} strokeWidth={2.5} />,
        }}
      />
    </ClientTab.Navigator>
  );
};

/**
 * ProviderTabNavigator
 * Bottom tabs for provider users
 */
const ProviderTab = createBottomTabNavigator<ProviderTabParamList>();
const ProviderTabNavigator = () => {
  return (
    <ProviderTab.Navigator
      initialRouteName="ProviderDashboardTab"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          height: 88,
          paddingBottom: 32,
          paddingTop: 8,
        },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={95} style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: "#7546EA",
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
      screenListeners={() => ({
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      })}
    >
      <ProviderTab.Screen
        name="ProviderDashboardTab"
        component={ProviderDashboardScreen}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} strokeWidth={2.5} />,
        }}
      />
      <ProviderTab.Screen
        name="ProviderPortfolioTab"
        component={ProviderPortfolioScreen}
        options={{
          title: "Portfolio",
          tabBarIcon: ({ color, size }) => <Briefcase size={size} color={color} strokeWidth={2.5} />,
        }}
      />
      <ProviderTab.Screen
        name="ProviderBookingsTab"
        component={ProviderBookingsScreen}
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} strokeWidth={2.5} />,
        }}
      />
      <ProviderTab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} strokeWidth={2.5} />,
        }}
      />
    </ProviderTab.Navigator>
  );
};

export default RootNavigator;
