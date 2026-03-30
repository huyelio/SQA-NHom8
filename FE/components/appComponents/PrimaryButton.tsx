import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({ text, onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        marginTop: 32,
        borderRadius: 14,
        overflow: "hidden",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <LinearGradient
        colors={["#6366F1", "#06B6D4"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          paddingVertical: 14,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
