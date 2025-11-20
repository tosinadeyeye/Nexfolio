import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Check, Crown, Zap, Star } from "lucide-react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type {
  GetCurrentSubscriptionResponse,
  UpgradeSubscriptionRequest,
  SubscriptionTier,
} from "../../shared/contracts";
import { SUBSCRIPTION_TIERS } from "../../shared/contracts";

export default function SubscriptionScreen() {
  const queryClient = useQueryClient();

  // Fetch current subscription
  const { data: currentSub, isLoading } = useQuery<GetCurrentSubscriptionResponse>({
    queryKey: ["subscription", "current"],
    queryFn: () => api.get<GetCurrentSubscriptionResponse>("/api/subscription/current"),
  });

  // Upgrade subscription mutation
  const upgradeMutation = useMutation({
    mutationFn: async (tier: SubscriptionTier) => {
      return api.post("/api/subscription/upgrade", { tier });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      Alert.alert("Success", "Your subscription has been updated!");
    },
    onError: (error: Error) => {
      Alert.alert("Error", error.message);
    },
  });

  // Cancel subscription mutation
  const cancelMutation = useMutation({
    mutationFn: () => api.post("/api/subscription/cancel", {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      Alert.alert("Cancelled", "You have been downgraded to the Free tier.");
    },
    onError: (error: Error) => {
      Alert.alert("Error", error.message);
    },
  });

  const handleUpgrade = (tier: SubscriptionTier) => {
    const tierInfo = SUBSCRIPTION_TIERS[tier];

    if (tier === "free") {
      Alert.alert(
        "Cancel Subscription",
        "Are you sure you want to cancel your subscription and downgrade to Free?",
        [
          { text: "No", style: "cancel" },
          { text: "Yes", style: "destructive", onPress: () => cancelMutation.mutate() },
        ]
      );
    } else {
      Alert.alert(
        "Upgrade Subscription",
        `Upgrade to ${tierInfo.name} for $${tierInfo.price}/month?`,
        [
          { text: "Cancel", style: "cancel" },
          { text: "Upgrade", onPress: () => upgradeMutation.mutate(tier) },
        ]
      );
    }
  };

  const getTierIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case "free":
        return <Zap size={24} color="#fff" />;
      case "starter":
        return <Star size={24} color="#fff" />;
      case "pro":
        return <Crown size={24} color="#fff" />;
      case "elite":
        return <Crown size={28} color="#FFD700" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50">
        <SafeAreaView edges={["top"]} className="flex-1">
          <View className="p-6">
            <Text className="text-2xl font-bold text-gray-900">Loading...</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView edges={["top"]} className="flex-1">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="p-6">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Subscription Plans
            </Text>
            <Text className="text-base text-gray-600">
              Choose the perfect plan for your business
            </Text>
          </View>

          {/* Current Plan */}
          {currentSub && (
            <View className="px-6 pb-6">
              <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Text className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Current Plan
                </Text>
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-2xl font-bold text-gray-900">
                      {SUBSCRIPTION_TIERS[currentSub.subscriptionTier].name}
                    </Text>
                    <Text className="text-base text-gray-600 mt-1">
                      ${currentSub.price}/month
                    </Text>
                  </View>
                  <View className="bg-purple-100 rounded-full p-3">
                    {getTierIcon(currentSub.subscriptionTier)}
                  </View>
                </View>

                {/* Portfolio usage */}
                <View className="mt-4 pt-4 border-t border-gray-100">
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    Portfolio Items
                  </Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-base text-gray-600">
                      {currentSub.currentPortfolioCount} /{" "}
                      {currentSub.portfolioLimit === -1
                        ? "Unlimited"
                        : currentSub.portfolioLimit}
                    </Text>
                    {currentSub.portfolioLimit !== -1 && (
                      <View className="flex-1 ml-4 bg-gray-200 rounded-full h-2">
                        <View
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              (currentSub.currentPortfolioCount /
                                currentSub.portfolioLimit) *
                                100,
                              100
                            )}%`,
                          }}
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Subscription Tiers */}
          <View className="px-6 pb-6">
            {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => {
              const isCurrent = currentSub?.subscriptionTier === key;
              const isUpgrade =
                currentSub &&
                tier.priority > SUBSCRIPTION_TIERS[currentSub.subscriptionTier].priority;

              return (
                <View key={key} className="mb-4">
                  <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                    {/* Header */}
                    <LinearGradient
                      colors={
                        key === "elite"
                          ? ["#FFD700", "#FFA500"]
                          : key === "pro"
                          ? ["#7546EA", "#FF67FF"]
                          : ["#6B7280", "#4B5563"]
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{ padding: 20 }}
                    >
                      <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-2xl font-bold text-white">
                          {tier.name}
                        </Text>
                        {getTierIcon(key as SubscriptionTier)}
                      </View>
                      <Text className="text-3xl font-bold text-white">
                        ${tier.price}
                        <Text className="text-lg font-normal"> /month</Text>
                      </Text>
                    </LinearGradient>

                    {/* Features */}
                    <View className="p-6">
                      {tier.features.map((feature, index) => (
                        <View key={index} className="flex-row items-start mb-3">
                          <View className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                            <Check size={14} color="#10B981" />
                          </View>
                          <Text className="flex-1 text-base text-gray-700">
                            {feature}
                          </Text>
                        </View>
                      ))}

                      {/* Action Button */}
                      <TouchableOpacity
                        onPress={() => handleUpgrade(key as SubscriptionTier)}
                        disabled={isCurrent || upgradeMutation.isPending}
                        className={`mt-4 rounded-xl py-4 ${
                          isCurrent
                            ? "bg-gray-200"
                            : isUpgrade
                            ? "bg-purple-600"
                            : "bg-gray-600"
                        }`}
                      >
                        <Text className="text-center text-white font-semibold text-base">
                          {isCurrent
                            ? "Current Plan"
                            : isUpgrade
                            ? "Upgrade Now"
                            : "Downgrade"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
