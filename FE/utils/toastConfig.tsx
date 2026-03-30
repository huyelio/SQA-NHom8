// src/utils/toastConfig.ts
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { BaseToastProps } from "react-native-toast-message";

const ToastBase = ({
  text1,
  type,
}: BaseToastProps & { type: "success" | "error" | "info" }) => {
  const bgColor =
    type === "success"
      ? "#10B981" // xanh lá ngọc (success)
      : type === "error"
      ? Colors.accent_red
      : Colors.accent_blue;

  return (
    <View style={[styles.container, { borderLeftColor: bgColor }]}>
      <Text style={[styles.text]} numberOfLines={3}>
        {text1}
      </Text>
    </View>
  );
};

export const toastConfig = {
  success: (props: BaseToastProps) => <ToastBase {...props} type="success" />,
  error: (props: BaseToastProps) => <ToastBase {...props} type="error" />,
  info: (props: BaseToastProps) => <ToastBase {...props} type="info" />,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderLeftWidth: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    shadowColor: Colors.glow,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  text: {
    color: Colors.text_primary,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
    textAlign: "left",
  },
});
