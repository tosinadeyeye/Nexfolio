import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { RootStackScreenProps } from "@/navigation/types";
import { useAppStore } from "@/state/appStore";
import { Image } from "expo-image";

type Props = RootStackScreenProps<"Splash">;

const SplashScreen = ({ navigation }: Props) => {
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);

  React.useEffect(() => {
    // Auto-navigate after 2 seconds
    const timer = setTimeout(() => {
      if (hasCompletedOnboarding) {
        navigation.replace("Tabs");
      } else {
        navigation.replace("RoleSelection");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [hasCompletedOnboarding, navigation]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#7546EA", "#FF67FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-center items-center px-8">
          {/* Logo */}
          <View className="items-center mb-12">
            <View
              className="bg-white rounded-3xl p-6 mb-8"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
                elevation: 15,
              }}
            >
              <Image
                source={require("../../assets/image-1763608540.jpeg")}
                style={{ width: 128, height: 128, borderRadius: 24 }}
                contentFit="cover"
              />
            </View>

            <Text className="text-6xl font-bold text-white mb-3 tracking-tight">
              Nexfolio
            </Text>
            <Text className="text-xl text-white/90 text-center font-medium">
              Connect. Try. Book.
            </Text>
          </View>

          {/* Tagline */}
          <View className="absolute bottom-20">
            <Text className="text-white/70 text-base text-center font-medium">
              Your professional marketplace
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SplashScreen;
