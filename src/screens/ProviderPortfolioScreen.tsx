import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Plus, X } from "lucide-react-native";
import type { ProviderTabScreenProps } from "@/navigation/types";
import { Image } from "expo-image";

type Props = ProviderTabScreenProps<"ProviderPortfolioTab">;

const ProviderPortfolioScreen = ({ navigation }: Props) => {
  // Mock portfolio items
  const [portfolioItems] = React.useState([
    { id: 1, imageUrl: "https://picsum.photos/400/400?random=1", title: "Bridal Makeup" },
    { id: 2, imageUrl: "https://picsum.photos/400/400?random=2", title: "Editorial Look" },
    { id: 3, imageUrl: "https://picsum.photos/400/400?random=3", title: "Natural Glam" },
    { id: 4, imageUrl: "https://picsum.photos/400/400?random=4", title: "Evening Makeup" },
    { id: 5, imageUrl: "https://picsum.photos/400/400?random=5", title: "Special Event" },
    { id: 6, imageUrl: "https://picsum.photos/400/400?random=6", title: "Photo Shoot" },
  ]);

  const handleAddNew = () => {
    Alert.alert(
      "Add Portfolio Item",
      "This feature will let you upload photos from your gallery or camera.",
      [{ text: "Got it" }]
    );
  };

  const handleDelete = (id: number) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this portfolio item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive" },
    ]);
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
            <Text className="text-3xl font-bold text-white mb-1">Portfolio</Text>
            <Text className="text-white/90 text-base">Showcase your best work</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Add New Button */}
        <Pressable onPress={handleAddNew} className="mb-6">
          <View
            className="bg-white border-2 border-dashed border-[#7546EA] rounded-3xl p-8 items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <View className="bg-[#7546EA]/10 rounded-full p-4 mb-3">
              <Plus size={32} color="#7546EA" strokeWidth={2.5} />
            </View>
            <Text className="text-[#7546EA] font-bold text-lg">Add New Item</Text>
            <Text className="text-gray-600 text-sm mt-1">Upload photos to your portfolio</Text>
          </View>
        </Pressable>

        {/* Portfolio Grid */}
        <View className="flex-row flex-wrap gap-3 mb-20">
          {portfolioItems.map((item) => (
            <View
              key={item.id}
              className="w-[48%] bg-white rounded-3xl overflow-hidden"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              {/* Image */}
              <View className="relative">
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: "100%", height: 180 }}
                  contentFit="cover"
                />
                {/* Delete Button */}
                <Pressable
                  onPress={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1.5"
                >
                  <X size={16} color="#FFFFFF" strokeWidth={3} />
                </Pressable>
              </View>

              {/* Title */}
              <View className="p-3">
                <Text className="text-gray-900 font-semibold text-sm" numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProviderPortfolioScreen;
