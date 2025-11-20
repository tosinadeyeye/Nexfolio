import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Clock, User } from "lucide-react-native";
import type { BottomTabScreenProps } from "@/navigation/types";

type Props = BottomTabScreenProps<"BookingsTab">;

const MOCK_BOOKINGS = [
  {
    id: 1,
    providerName: "Sarah Johnson",
    service: "Makeup Trial",
    date: "Dec 25, 2025",
    time: "2:00 PM",
    status: "confirmed",
    price: 45,
    isTrial: true,
  },
  {
    id: 2,
    providerName: "Mike Chen",
    service: "Electrical Consultation",
    date: "Dec 28, 2025",
    time: "10:00 AM",
    status: "pending",
    price: 60,
    isTrial: true,
  },
  {
    id: 3,
    providerName: "Emma Davis",
    service: "Hair Styling",
    date: "Dec 20, 2025",
    time: "3:00 PM",
    status: "completed",
    price: 50,
    isTrial: true,
  },
];

const BookingsScreen = ({ navigation }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 border-green-200";
      case "pending":
        return "bg-yellow-50 border-yellow-200";
      case "completed":
        return "bg-purple-50 border-purple-200";
      case "cancelled":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
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
            <Text className="text-3xl font-bold text-white">My Bookings</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 pt-6">
        {MOCK_BOOKINGS.map((booking) => (
          <Pressable
            key={booking.id}
            onPress={() => navigation.navigate("BookingDetail", { bookingId: booking.id })}
            className="bg-white rounded-3xl p-5 mb-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 mb-1">
                  {booking.service}
                </Text>
                <View className="flex-row items-center">
                  <User size={14} color="#666" />
                  <Text className="text-sm text-gray-600 ml-1">{booking.providerName}</Text>
                </View>
              </View>
              <View className={`border rounded-full px-3 py-1 ${getStatusColor(booking.status)}`}>
                <Text className="text-xs font-medium capitalize">{booking.status}</Text>
              </View>
            </View>

            {/* Date & Time */}
            <View className="bg-gray-50 rounded-2xl p-4 mb-4">
              <View className="flex-row items-center mb-2">
                <Calendar size={16} color="#7546EA" />
                <Text className="text-gray-700 font-medium ml-2">{booking.date}</Text>
              </View>
              <View className="flex-row items-center">
                <Clock size={16} color="#7546EA" />
                <Text className="text-gray-700 font-medium ml-2">{booking.time}</Text>
              </View>
            </View>

            {/* Footer */}
            <View className="flex-row items-center justify-between">
              <View>
                {booking.isTrial && (
                  <View className="bg-[#7546EA]/10 px-3 py-1 rounded-full mb-1">
                    <Text className="text-xs font-bold text-[#7546EA]">TRIAL SESSION</Text>
                  </View>
                )}
                <Text className="text-lg font-bold text-gray-900">${booking.price}</Text>
              </View>

              {booking.status === "completed" && (
                <Pressable className="bg-[#7546EA] px-4 py-2 rounded-full">
                  <Text className="text-white font-bold text-sm">Leave Review</Text>
                </Pressable>
              )}
            </View>
          </Pressable>
        ))}

        {MOCK_BOOKINGS.length === 0 && (
          <View className="items-center justify-center py-20">
            <Calendar size={64} color="#D1D5DB" strokeWidth={1.5} />
            <Text className="text-gray-500 text-lg mt-4">No bookings yet</Text>
            <Text className="text-gray-400 text-sm mt-2">Start exploring professionals!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BookingsScreen;
