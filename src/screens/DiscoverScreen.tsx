import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Search, Star, MapPin, Briefcase } from "lucide-react-native";
import type { BottomTabScreenProps } from "@/navigation/types";

type Props = BottomTabScreenProps<"DiscoverTab">;

const SERVICE_CATEGORIES = [
  "All",
  "Makeup Artist",
  "Hair Stylist",
  "Nail Tech",
  "Photographer",
  "Plumber",
  "Electrician",
  "Graphic Designer",
  "Interior Decorator",
];

const MOCK_PROVIDERS = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@sarahbeauty",
    service: "Makeup Artist",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    trialPrice: 45,
    image: "👩‍🎨",
  },
  {
    id: 2,
    name: "Mike Chen",
    handle: "@mikefixes",
    service: "Electrician",
    rating: 4.8,
    reviews: 89,
    location: "Brooklyn, NY",
    trialPrice: 60,
    image: "⚡",
  },
  {
    id: 3,
    name: "Emma Davis",
    handle: "@emmahair",
    service: "Hair Stylist",
    rating: 5.0,
    reviews: 203,
    location: "Manhattan, NY",
    trialPrice: 50,
    image: "💇‍♀️",
  },
];

const DiscoverScreen = ({ navigation }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

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
            <Text className="text-3xl font-bold text-white mb-4">Discover</Text>

            {/* Search Bar */}
            <View className="bg-white/20 rounded-2xl px-4 py-3 flex-row items-center">
              <Search size={20} color="#FFFFFF" strokeWidth={2} />
              <Text className="text-white/70 ml-3 text-base">Search professionals...</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView className="flex-1">
        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-6 py-4 bg-white"
        >
          {SERVICE_CATEGORIES.map((category) => (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              className={`mr-3 px-5 py-2.5 rounded-full ${
                selectedCategory === category ? "bg-[#7546EA]" : "bg-gray-100"
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedCategory === category ? "text-white" : "text-gray-700"
                }`}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Providers List */}
        <View className="px-6 py-4">
          <Text className="text-lg font-bold text-gray-900 mb-4">Top Professionals</Text>

          {MOCK_PROVIDERS.map((provider) => (
            <Pressable
              key={provider.id}
              className="bg-white rounded-3xl p-4 mb-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="flex-row">
                {/* Avatar */}
                <View className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7546EA] to-[#FF67FF] items-center justify-center mr-4">
                  <Text className="text-4xl">{provider.image}</Text>
                </View>

                {/* Info */}
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-lg font-bold text-gray-900">{provider.name}</Text>
                    <View className="flex-row items-center bg-[#7546EA]/10 px-2 py-1 rounded-full">
                      <Star size={14} color="#7546EA" fill="#7546EA" />
                      <Text className="text-[#7546EA] font-bold ml-1 text-sm">
                        {provider.rating}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-sm text-gray-500 mb-2">{provider.handle}</Text>

                  <View className="flex-row items-center mb-2">
                    <Briefcase size={14} color="#666" />
                    <Text className="text-sm text-gray-600 ml-1">{provider.service}</Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <MapPin size={14} color="#666" />
                      <Text className="text-sm text-gray-600 ml-1">{provider.location}</Text>
                    </View>
                    <Text className="text-sm font-bold text-[#7546EA]">
                      ${provider.trialPrice} trial
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DiscoverScreen;
