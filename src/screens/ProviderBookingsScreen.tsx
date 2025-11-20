import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Clock, User, MapPin } from "lucide-react-native";
import type { ProviderTabScreenProps } from "@/navigation/types";

type Props = ProviderTabScreenProps<"ProviderBookingsTab">;

const ProviderBookingsScreen = ({ navigation }: Props) => {
  // Mock bookings from provider perspective
  const bookings = [
    {
      id: 1,
      clientName: "Jessica Parker",
      service: "Makeup Trial",
      date: "Dec 25, 2025",
      time: "2:00 PM",
      status: "confirmed",
      price: 45,
      location: "123 Main St, New York, NY",
    },
    {
      id: 2,
      clientName: "Michael Scott",
      service: "Full Makeup Service",
      date: "Dec 26, 2025",
      time: "4:30 PM",
      status: "pending",
      price: 150,
      location: "456 Park Ave, New York, NY",
    },
    {
      id: 3,
      clientName: "Emily Chen",
      service: "Bridal Trial",
      date: "Dec 27, 2025",
      time: "10:00 AM",
      status: "confirmed",
      price: 60,
      location: "789 Broadway, New York, NY",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" };
      case "pending":
        return { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" };
      case "completed":
        return { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
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
            <Text className="text-3xl font-bold text-white">Client Bookings</Text>
            <Text className="text-white/90 text-base">Manage your appointments</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {bookings.map((booking) => {
          const colors = getStatusColor(booking.status);

          return (
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
              {/* Status Badge */}
              <View className={`self-start ${colors.bg} border ${colors.border} rounded-full px-3 py-1 mb-4`}>
                <Text className={`${colors.text} font-bold text-xs uppercase`}>
                  {booking.status}
                </Text>
              </View>

              {/* Client Info */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {booking.service}
                  </Text>
                  <View className="flex-row items-center">
                    <User size={16} color="#666" />
                    <Text className="text-gray-600 ml-2 text-sm">{booking.clientName}</Text>
                  </View>
                </View>
                <View className="bg-[#7546EA]/10 px-4 py-2 rounded-full">
                  <Text className="text-[#7546EA] font-bold text-base">${booking.price}</Text>
                </View>
              </View>

              {/* Date & Time */}
              <View className="bg-gray-50 rounded-2xl p-4 mb-3">
                <View className="flex-row items-center mb-2">
                  <Calendar size={16} color="#7546EA" />
                  <Text className="text-gray-700 font-medium ml-2">{booking.date}</Text>
                </View>
                <View className="flex-row items-center">
                  <Clock size={16} color="#7546EA" />
                  <Text className="text-gray-700 font-medium ml-2">{booking.time}</Text>
                </View>
              </View>

              {/* Location */}
              <View className="flex-row items-center">
                <MapPin size={16} color="#666" />
                <Text className="text-gray-600 ml-2 text-sm flex-1" numberOfLines={1}>
                  {booking.location}
                </Text>
              </View>
            </Pressable>
          );
        })}

        <View className="h-20" />
      </ScrollView>
    </View>
  );
};

export default ProviderBookingsScreen;
