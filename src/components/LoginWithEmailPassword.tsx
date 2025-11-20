import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { authClient } from "@/lib/authClient";

interface Props {
  onSuccess?: () => void;
}

const LoginWithEmailPassword = ({ onSuccess }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (isSignUp && !name) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up
        await authClient.signUp.email({
          email,
          password,
          name,
        });
        Alert.alert("Success", "Account created! Please sign in.");
        setIsSignUp(false);
        setPassword("");
      } else {
        // Sign in
        await authClient.signIn.email({
          email,
          password,
        });
        onSuccess?.();
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      Alert.alert("Error", error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1">
      {isSignUp && (
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-base"
            autoCapitalize="words"
            editable={!loading}
          />
        </View>
      )}

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-base"
          editable={!loading}
        />
      </View>

      <View className="mb-6">
        <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4 text-base"
          editable={!loading}
        />
      </View>

      <Pressable onPress={handleAuth} disabled={loading} className="mb-4">
        <LinearGradient
          colors={["#7546EA", "#FF67FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: "center",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white text-lg font-bold">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Text>
          )}
        </LinearGradient>
      </Pressable>

      <Pressable
        onPress={() => setIsSignUp(!isSignUp)}
        disabled={loading}
        className="items-center"
      >
        <Text className="text-gray-600">
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <Text className="text-[#7546EA] font-bold">
            {isSignUp ? "Sign In" : "Sign Up"}
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

export default LoginWithEmailPassword;
