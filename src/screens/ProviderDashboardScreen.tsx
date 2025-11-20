import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { TrendingUp, Calendar, DollarSign, Users, Star, Briefcase } from "lucide-react-native";
import type { ProviderTabScreenProps } from "@/navigation/types";

type Props = ProviderTabScreenProps<"ProviderDashboardTab">;

const ProviderDashboardScreen = ({ navigation }: Props) => {
  // Mock provider stats
  const stats = {
    todayBookings: 3,
    thisWeekRevenue: 450,
    totalClients: 28,
    averageRating: 4.9,
    upcomingBookings: [
      {
        id: 1,
        clientName: "Jessica Parker",
        service: "Makeup Trial",
        time: "2:00 PM",
        date: "Today",
        price: 45,
      },
      {
        id: 2,
        clientName: "Michael Scott",
        service: "Full Makeup",
        time: "4:30 PM",
        date: "Today",
        price: 150,
      },
      {
        id: 3,
        clientName: "Emily Chen",
        service: "Bridal Trial",
        time: "10:00 AM",
        date: "Tomorrow",
        price: 60,
      },
    ],
  };

  return (
    <View className="flex-1 bg-[#F1F1F1]">
      {/* Custom Header */}
      <LinearGradient
        colors={["#7546EA", "#FF67FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={["top"]}>
          <View className="px-6 pb-6 pt-2">
            <Text className="text-3xl font-bold text-white mb-1">Dashboard</Text>
            <Text className="text-white/90 text-base">Welcome back!</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Stats Grid */}
        <View className="flex-row flex-wrap gap-3 mb-6">
          {/* Today's Bookings */}
          <View
            className="flex-1 min-w-[45%] bg-white rounded-3xl p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="bg-[#7546EA]/10 rounded-full p-3 self-start mb-3">
              <Calendar size={24} color="#7546EA" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-1">{stats.todayBookings}</Text>
            <Text className="text-sm text-gray-600">Today&apos;s Bookings</Text>
          </View>

          {/* This Week Revenue */}
          <View
            className="flex-1 min-w-[45%] bg-white rounded-3xl p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="bg-green-50 rounded-full p-3 self-start mb-3">
              <DollarSign size={24} color="#10B981" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-1">${stats.thisWeekRevenue}</Text>
            <Text className="text-sm text-gray-600">This Week</Text>
          </View>

          {/* Total Clients */}
          <View
            className="flex-1 min-w-[45%] bg-white rounded-3xl p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="bg-blue-50 rounded-full p-3 self-start mb-3">
              <Users size={24} color="#3B82F6" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-1">{stats.totalClients}</Text>
            <Text className="text-sm text-gray-600">Total Clients</Text>
          </View>

          {/* Average Rating */}
          <View
            className="flex-1 min-w-[45%] bg-white rounded-3xl p-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="bg-yellow-50 rounded-full p-3 self-start mb-3">
              <Star size={24} color="#F59E0B" fill="#F59E0B" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-1">{stats.averageRating}</Text>
            <Text className="text-sm text-gray-600">Average Rating</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-gray-900 mb-4">Quick Actions</Text>
          <View className="flex-row gap-3">
            <Pressable className="flex-1">
              <LinearGradient
                colors={["#7546EA", "#9D6EFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 20,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <Briefcase size={28} color="#FFFFFF" strokeWidth={2.5} />
                <Text className="text-white font-bold mt-2 text-sm">Portfolio</Text>
              </LinearGradient>
            </Pressable>

            <Pressable className="flex-1">
              <View className="bg-white border-2 border-gray-200 rounded-3xl p-4 items-center">
                <TrendingUp size={28} color="#7546EA" strokeWidth={2.5} />
                <Text className="text-gray-900 font-bold mt-2 text-sm">Analytics</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Upcoming Bookings */}
        <View className="mb-20">
          <Text className="text-xl font-bold text-gray-900 mb-4">Upcoming Bookings</Text>

          {stats.upcomingBookings.map((booking) => (
            <Pressable
              key={booking.id}
              className="bg-white rounded-3xl p-5 mb-3"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {booking.clientName}
                  </Text>
                  <Text className="text-sm text-gray-600">{booking.service}</Text>
                </View>
                <View className="bg-[#7546EA]/10 px-3 py-1.5 rounded-full">
                  <Text className="text-[#7546EA] font-bold text-sm">${booking.price}</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="flex-row items-center flex-1">
                  <Calendar size={16} color="#666" />
                  <Text className="text-gray-700 ml-2 text-sm">{booking.date}</Text>
                </View>
                <Text className="text-gray-700 font-medium">{booking.time}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProviderDashboardScreen;
