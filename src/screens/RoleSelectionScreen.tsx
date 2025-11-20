import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Briefcase, User, Check } from "lucide-react-native";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"RoleSelection">;

const RoleSelectionScreen = ({ navigation }: Props) => {
  const [selectedRole, setSelectedRole] = useState<"provider" | "client" | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      navigation.navigate("LoginModalScreen", { role: selectedRole });
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header with gradient */}
      <LinearGradient
        colors={["#7546EA", "#FF67FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 40, paddingHorizontal: 24 }}
      >
        <Text className="text-4xl font-bold text-white mb-2">Welcome to Nexfolio</Text>
        <Text className="text-lg text-white/90">Choose your role to get started</Text>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 pt-8">
        {/* Provider Card */}
        <Pressable
          onPress={() => setSelectedRole("provider")}
          className="mb-6"
        >
          <View
            className={`border-2 rounded-3xl p-6 ${
              selectedRole === "provider"
                ? "border-[#7546EA] bg-[#7546EA]/5"
                : "border-gray-200 bg-white"
            }`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="bg-[#7546EA]/10 rounded-full p-3">
                <Briefcase size={32} color="#7546EA" strokeWidth={2} />
              </View>
              {selectedRole === "provider" && (
                <View className="bg-[#7546EA] rounded-full p-1">
                  <Check size={20} color="#FFFFFF" strokeWidth={3} />
                </View>
              )}
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-2">I&apos;m a Provider</Text>
            <Text className="text-base text-gray-600 leading-6">
              Showcase your skills, offer trial services, and grow your client base. Perfect for
              makeup artists, stylists, electricians, consultants, and more.
            </Text>
          </View>
        </Pressable>

        {/* Client Card */}
        <Pressable
          onPress={() => setSelectedRole("client")}
          className="mb-8"
        >
          <View
            className={`border-2 rounded-3xl p-6 ${
              selectedRole === "client"
                ? "border-[#FF67FF] bg-[#FF67FF]/5"
                : "border-gray-200 bg-white"
            }`}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="bg-[#FF67FF]/10 rounded-full p-3">
                <User size={32} color="#FF67FF" strokeWidth={2} />
              </View>
              {selectedRole === "client" && (
                <View className="bg-[#FF67FF] rounded-full p-1">
                  <Check size={20} color="#FFFFFF" strokeWidth={3} />
                </View>
              )}
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-2">I&apos;m a Client</Text>
            <Text className="text-base text-gray-600 leading-6">
              Discover talented professionals, book trial services, and find the perfect match for
              your needs. Try before you commit to full bookings.
            </Text>
          </View>
        </Pressable>

        {/* Continue Button */}
        {selectedRole && (
          <Pressable
            onPress={handleContinue}
            className="mb-8"
          >
            <LinearGradient
              colors={selectedRole === "provider" ? ["#7546EA", "#9D6EFF"] : ["#FF67FF", "#FF8FFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 16,
                paddingVertical: 18,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text className="text-white text-lg font-bold">Continue</Text>
            </LinearGradient>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default RoleSelectionScreen;
