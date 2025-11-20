import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { Search, Calendar, User } from "lucide-react-native";

import type { BottomTabParamList, RootStackParamList } from "@/navigation/types";
import SplashScreen from "@/screens/SplashScreen";
import RoleSelectionScreen from "@/screens/RoleSelectionScreen";
import LoginModalScreen from "@/screens/LoginModalScreen";
import DiscoverScreen from "@/screens/DiscoverScreen";
import BookingsScreen from "@/screens/BookingsScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import ProviderDetailScreen from "@/screens/ProviderDetailScreen";
import BookingDetailScreen from "@/screens/BookingDetailScreen";

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
      <RootStack.Screen
        name="Splash"
        component={SplashScreen}
      />
      <RootStack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
      />

      {/* Main App */}
      <RootStack.Screen
        name="Tabs"
        component={BottomTabNavigator}
      />

      {/* Modals & Detail Screens */}
      <RootStack.Screen
        name="LoginModalScreen"
        component={LoginModalScreen}
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Sign In"
        }}
      />
      <RootStack.Screen
        name="ProviderDetail"
        component={ProviderDetailScreen}
        options={{
          headerShown: true,
          title: "Provider Details",
          headerBackTitle: "Back"
        }}
      />
      <RootStack.Screen
        name="BookingDetail"
        component={BookingDetailScreen}
        options={{
          headerShown: true,
          title: "Booking Details",
          headerBackTitle: "Back"
        }}
      />
    </RootStack.Navigator>
  );
};

/**
 * BottomTabNavigator
 * Main tabs for the client experience
 */
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
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
      <BottomTab.Screen
        name="DiscoverTab"
        component={DiscoverScreen}
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} strokeWidth={2.5} />,
        }}
      />
      <BottomTab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} strokeWidth={2.5} />,
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} strokeWidth={2.5} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default RootNavigator;
