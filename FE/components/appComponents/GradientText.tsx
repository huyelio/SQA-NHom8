// components/GradientText.tsx

import React from "react";
import { Text, TextProps } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";

interface GradientTextProps extends TextProps {
  colors: readonly [string, string, ...string[]];
  children: React.ReactNode;
}

export default function GradientText({
  colors,
  children,
  style,
  ...props
}: GradientTextProps) {
  return (
    <MaskedView
      maskElement={
        <Text {...props} style={[style, { backgroundColor: "transparent" }]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[style, { opacity: 0 }]}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}
