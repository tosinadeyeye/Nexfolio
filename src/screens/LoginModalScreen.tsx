import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginWithEmailPassword from "@/components/LoginWithEmailPassword";
import type { RootStackScreenProps } from "@/navigation/types";

type Props = RootStackScreenProps<"LoginModalScreen">;

const LoginModalScreen = ({ navigation, route }: Props) => {
  const role = route.params?.role;

  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-6">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          {role === "provider" ? "Provider Sign In" : "Client Sign In"}
        </Text>
        <Text className="text-gray-600 mb-8">
          Sign in to continue to Nexfolio
        </Text>
        <LoginWithEmailPassword onSuccess={() => navigation.replace("Tabs")} />
      </View>
    </SafeAreaView>
  );
};

export default LoginModalScreen;
