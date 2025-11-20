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

/**
 * RootStackNavigator
 * The root navigator for the app, which contains the bottom tab navigator and all the screens inside it
 * Most of the new screens will go here
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Splash">
      <RootStack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="RoleSelection"
        component={RoleSelectionScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Tabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="LoginModalScreen"
        component={LoginModalScreen}
        options={{ presentation: "modal", title: "Login" }}
      />
    </RootStack.Navigator>
  );
};

/**
 * BottomTabNavigator
 * The bottom tab navigator for the app, which contains ONLY the bottom tab screens
 * If you want to add a new screen, you should add it here
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
        },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={80} style={StyleSheet.absoluteFill} />
        ),
        tabBarActiveTintColor: "#7546EA",
        tabBarInactiveTintColor: "#9CA3AF",
        headerShown: false,
      }}
      screenListeners={() => ({
        transitionStart: () => {
          Haptics.selectionAsync();
        },
      })}
    >
      <BottomTab.Screen
        name="DiscoverTab"
        component={DiscoverScreen}
        options={{
          title: "Discover",
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="BookingsTab"
        component={BookingsScreen}
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default RootNavigator;
