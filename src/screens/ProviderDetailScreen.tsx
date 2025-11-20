import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Star, MapPin, Briefcase } from "lucide-react-native";
import type { RootStackScreenProps } from "@/navigation/types";
import { Image } from "expo-image";

type Props = RootStackScreenProps<"ProviderDetail">;

const ProviderDetailScreen = ({ navigation, route }: Props) => {
  const { providerId } = route.params;

  // Mock provider data
  const provider = {
    id: providerId,
    name: "Sarah Johnson",
    handle: "@sarahbeauty",
    service: "Makeup Artist",
    rating: 4.9,
    reviews: 127,
    location: "New York, NY",
    trialPrice: 45,
    fullPrice: 150,
    bio: "Professional makeup artist with 10+ years of experience. Specializing in bridal, editorial, and special events makeup.",
    image: "👩‍🎨",
    portfolio: [
      "https://picsum.photos/400/400?random=1",
      "https://picsum.photos/400/400?random=2",
      "https://picsum.photos/400/400?random=3",
    ],
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View className="h-64 bg-gradient-to-br from-[#7546EA] to-[#FF67FF] items-center justify-center">
          <Text className="text-8xl">{provider.image}</Text>
        </View>

        {/* Main Content */}
        <View className="px-6 py-6">
          {/* Provider Info */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-3xl font-bold text-gray-900">{provider.name}</Text>
              <View className="flex-row items-center bg-[#7546EA]/10 px-3 py-2 rounded-full">
                <Star size={18} color="#7546EA" fill="#7546EA" />
                <Text className="text-[#7546EA] font-bold ml-1.5 text-base">
                  {provider.rating}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 text-base mb-3">{provider.handle}</Text>

            <View className="flex-row items-center mb-2">
              <Briefcase size={18} color="#666" />
              <Text className="text-gray-700 ml-2 text-base">{provider.service}</Text>
            </View>

            <View className="flex-row items-center">
              <MapPin size={18} color="#666" />
              <Text className="text-gray-700 ml-2 text-base">{provider.location}</Text>
            </View>
          </View>

          {/* Bio */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">About</Text>
            <Text className="text-gray-600 text-base leading-6">{provider.bio}</Text>
          </View>

          {/* Pricing */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">Pricing</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 bg-[#7546EA]/5 border-2 border-[#7546EA] rounded-2xl p-4">
                <Text className="text-[#7546EA] font-bold text-sm mb-1">TRIAL SESSION</Text>
                <Text className="text-2xl font-bold text-gray-900">${provider.trialPrice}</Text>
                <Text className="text-gray-600 text-sm mt-1">60 minutes</Text>
              </View>
              <View className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-2xl p-4">
                <Text className="text-gray-600 font-bold text-sm mb-1">FULL SERVICE</Text>
                <Text className="text-2xl font-bold text-gray-900">${provider.fullPrice}</Text>
                <Text className="text-gray-600 text-sm mt-1">2-3 hours</Text>
              </View>
            </View>
          </View>

          {/* Portfolio */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-900 mb-3">Portfolio</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {provider.portfolio.map((img, idx) => (
                <View key={idx} className="mr-3">
                  <Image
                    source={{ uri: img }}
                    style={{ width: 200, height: 200, borderRadius: 16 }}
                    contentFit="cover"
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Reviews Summary */}
          <View className="mb-20">
            <Text className="text-xl font-bold text-gray-900 mb-3">
              Reviews ({provider.reviews})
            </Text>
            <Text className="text-gray-600 text-base">
              See what clients are saying about {provider.name.split(" ")[0]}...
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Book Button */}
      <SafeAreaView edges={["bottom"]} className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 pt-4">
        <Pressable
          onPress={() => {
            // Navigate to booking flow
            navigation.goBack();
          }}
        >
          <LinearGradient
            colors={["#7546EA", "#FF67FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 16,
              paddingVertical: 18,
              alignItems: "center",
            }}
          >
            <Text className="text-white text-lg font-bold">Book Trial Session</Text>
          </LinearGradient>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default ProviderDetailScreen;
