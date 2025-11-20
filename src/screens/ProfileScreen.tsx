import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Settings,
  LogOut,
  Star,
  Calendar,
  Award,
} from "lucide-react-native";
import type { BottomTabScreenProps } from "@/navigation/types";
import { useSession } from "@/lib/useSession";

type Props = BottomTabScreenProps<"ProfileTab">;

const ProfileScreen = ({ navigation }: Props) => {
  const { data: session } = useSession();

  // Mock profile data
  const profile = {
    name: session?.user?.name || "Guest User",
    email: session?.user?.email || "user@example.com",
    handle: "@johndoe",
    location: "New York, NY",
    phone: "+1 (555) 123-4567",
    totalBookings: 12,
    completedBookings: 10,
    rating: 4.9,
  };

  return (
    <View className="flex-1 bg-[#F1F1F1]">
      {/* Header with Gradient */}
      <LinearGradient
        colors={["#7546EA", "#FF67FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={["top"]}>
          <View className="items-center pb-8 pt-2">
            {/* Avatar */}
            <View
              className="w-24 h-24 rounded-full bg-white items-center justify-center mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <User size={48} color="#7546EA" strokeWidth={2} />
            </View>

            <Text className="text-2xl font-bold text-white mb-1">{profile.name}</Text>
            <Text className="text-white/80 text-base">{profile.handle}</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 -mt-4">
        {/* Stats Card */}
        <View
          className="bg-white rounded-3xl p-5 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text className="text-lg font-bold text-gray-900 mb-4">My Stats</Text>
          <View className="flex-row justify-around">
            <View className="items-center">
              <View className="bg-[#7546EA]/10 rounded-full p-3 mb-2">
                <Calendar size={24} color="#7546EA" />
              </View>
              <Text className="text-2xl font-bold text-gray-900">{profile.totalBookings}</Text>
              <Text className="text-sm text-gray-600">Bookings</Text>
            </View>

            <View className="items-center">
              <View className="bg-[#FF67FF]/10 rounded-full p-3 mb-2">
                <Award size={24} color="#FF67FF" />
              </View>
              <Text className="text-2xl font-bold text-gray-900">{profile.completedBookings}</Text>
              <Text className="text-sm text-gray-600">Completed</Text>
            </View>

            <View className="items-center">
              <View className="bg-green-50 rounded-full p-3 mb-2">
                <Star size={24} color="#10B981" fill="#10B981" />
              </View>
              <Text className="text-2xl font-bold text-gray-900">{profile.rating}</Text>
              <Text className="text-sm text-gray-600">Rating</Text>
            </View>
          </View>
        </View>

        {/* Contact Info Card */}
        <View
          className="bg-white rounded-3xl p-5 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text className="text-lg font-bold text-gray-900 mb-4">Contact Information</Text>

          <View className="flex-row items-center mb-4">
            <View className="bg-[#7546EA]/10 rounded-full p-2 mr-3">
              <Mail size={20} color="#7546EA" />
            </View>
            <Text className="text-gray-700 flex-1">{profile.email}</Text>
          </View>

          <View className="flex-row items-center mb-4">
            <View className="bg-[#7546EA]/10 rounded-full p-2 mr-3">
              <Phone size={20} color="#7546EA" />
            </View>
            <Text className="text-gray-700 flex-1">{profile.phone}</Text>
          </View>

          <View className="flex-row items-center">
            <View className="bg-[#7546EA]/10 rounded-full p-2 mr-3">
              <MapPin size={20} color="#7546EA" />
            </View>
            <Text className="text-gray-700 flex-1">{profile.location}</Text>
          </View>
        </View>

        {/* Settings Options */}
        <View
          className="bg-white rounded-3xl p-5 mb-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Pressable className="flex-row items-center py-4 border-b border-gray-100">
            <Settings size={22} color="#666" />
            <Text className="text-gray-900 font-medium ml-3 flex-1">Settings</Text>
          </Pressable>

          <Pressable className="flex-row items-center py-4">
            <LogOut size={22} color="#EF4444" />
            <Text className="text-red-500 font-medium ml-3 flex-1">Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
