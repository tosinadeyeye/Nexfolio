import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"Splash">;

const SplashScreen = ({ navigation }: Props) => {
  const handleGetStarted = () => {
    navigation.replace("RoleSelection");
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#7546EA", "#FF67FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-center items-center px-8">
          {/* Logo Area */}
          <View className="items-center mb-12">
            <View className="bg-white rounded-3xl p-6 mb-6" style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 16,
              elevation: 10,
            }}>
              <Image
                source={require("../../assets/image-1763608540.jpeg")}
                style={{ width: 120, height: 120, borderRadius: 20 }}
                resizeMode="cover"
              />
            </View>
            <Text className="text-6xl font-bold text-white mb-2">Nexfolio</Text>
            <Text className="text-xl text-white/90 text-center">
              Connect. Try. Book.
            </Text>
          </View>

          {/* Description */}
          <Text className="text-lg text-white/90 text-center mb-12 leading-7">
            Discover talented professionals for trial-based services. From makeup artists to
            electricians, find the perfect match for your needs.
          </Text>

          {/* CTA Button */}
          <Pressable
            onPress={handleGetStarted}
            className="bg-white rounded-full px-12 py-5 shadow-lg active:opacity-80"
          >
            <Text className="text-[#7546EA] text-lg font-bold">Get Started</Text>
          </Pressable>

          {/* Footer */}
          <Text className="text-white/70 text-sm mt-auto mb-8">
            Your journey to finding professionals starts here
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;
