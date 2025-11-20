import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Clock, MapPin, User, DollarSign } from "lucide-react-native";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"BookingDetail">;

const BookingDetailScreen = ({ navigation, route }: Props) => {
  const { bookingId } = route.params;

  // Mock booking data
  const booking = {
    id: bookingId,
    providerName: "Sarah Johnson",
    service: "Makeup Trial",
    date: "Dec 25, 2025",
    time: "2:00 PM",
    status: "confirmed",
    price: 45,
    isTrial: true,
    location: "123 Main St, New York, NY 10001",
    notes: "Please bring your own foundation preferences",
  };

  const getStatusColor = () => {
    switch (booking.status) {
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

  const colors = getStatusColor();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 py-6">
        {/* Status Badge */}
        <View className={`self-start ${colors.bg} border-2 ${colors.border} rounded-full px-4 py-2 mb-6`}>
          <Text className={`${colors.text} font-bold text-sm uppercase`}>{booking.status}</Text>
        </View>

        {/* Service Info */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">{booking.service}</Text>
          <View className="flex-row items-center">
            <User size={18} color="#666" />
            <Text className="text-gray-600 ml-2 text-base">with {booking.providerName}</Text>
          </View>
        </View>

        {/* Trial Badge */}
        {booking.isTrial && (
          <View className="bg-[#7546EA]/10 px-4 py-3 rounded-2xl mb-6">
            <Text className="text-[#7546EA] font-bold text-sm">✨ TRIAL SESSION</Text>
            <Text className="text-gray-600 text-sm mt-1">
              Try the service before committing to full booking
            </Text>
          </View>
        )}

        {/* Date & Time */}
        <View className="bg-gray-50 rounded-2xl p-5 mb-6">
          <View className="flex-row items-center mb-3">
            <Calendar size={20} color="#7546EA" />
            <Text className="text-gray-900 font-semibold ml-2 text-base">Date</Text>
          </View>
          <Text className="text-gray-700 text-lg font-medium mb-4">{booking.date}</Text>

          <View className="flex-row items-center mb-3">
            <Clock size={20} color="#7546EA" />
            <Text className="text-gray-900 font-semibold ml-2 text-base">Time</Text>
          </View>
          <Text className="text-gray-700 text-lg font-medium">{booking.time}</Text>
        </View>

        {/* Location */}
        <View className="bg-gray-50 rounded-2xl p-5 mb-6">
          <View className="flex-row items-center mb-3">
            <MapPin size={20} color="#7546EA" />
            <Text className="text-gray-900 font-semibold ml-2 text-base">Location</Text>
          </View>
          <Text className="text-gray-700 text-base">{booking.location}</Text>
        </View>

        {/* Notes */}
        {booking.notes && (
          <View className="bg-gray-50 rounded-2xl p-5 mb-6">
            <Text className="text-gray-900 font-semibold mb-2 text-base">Notes</Text>
            <Text className="text-gray-700 text-base">{booking.notes}</Text>
          </View>
        )}

        {/* Price */}
        <View className="bg-[#7546EA]/5 border-2 border-[#7546EA] rounded-2xl p-5 mb-20">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <DollarSign size={20} color="#7546EA" />
              <Text className="text-gray-900 font-semibold ml-2 text-base">Total Price</Text>
            </View>
            <Text className="text-3xl font-bold text-[#7546EA]">${booking.price}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {booking.status === "confirmed" && (
        <SafeAreaView edges={["bottom"]} className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 pt-4">
          <View className="flex-row gap-3 mb-2">
            <Pressable className="flex-1" onPress={() => navigation.goBack()}>
              <View className="bg-gray-100 rounded-2xl py-4 items-center">
                <Text className="text-gray-700 font-bold">Cancel Booking</Text>
              </View>
            </Pressable>
            <Pressable className="flex-1">
              <LinearGradient
                colors={["#7546EA", "#FF67FF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 16,
                  paddingVertical: 16,
                  alignItems: "center",
                }}
              >
                <Text className="text-white font-bold">Reschedule</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default BookingDetailScreen;
