import { StyleSheet } from "react-native";

export const Colors = {
  background: "#0D0D0D",
  card: "#1A1A1A",
  primary: "#6366F1",
  primary_2: "#06B6D4", // xanh dương cyan (phụ, tạo gradient)
  accent_purple: "#8B5CF6", // tím sáng (dùng cho icon, highlight)
  accent_blue: "#3B82F6", // xanh sáng (hover / secondary button)
  accent_red: "#EF4444", // đỏ neon nhỏ cho alert hoặc nhịp tim
  text_primary: "#F3F4F6", // chữ sáng chính
  text_secondary: "#9CA3AF", // chữ phụ
  border: "#1F2937", // viền xám đậm
};

export const getGradientByPercent = (
  percent: number
): readonly [string, string] => {
  if (percent < 0.3) return ["#EF4444", "#F97316"] as const; // đỏ → cam

  if (percent < 0.6) return ["#F97316", "#FACC15"] as const; // cam → vàng

  if (percent < 0.8) return ["#FACC15", "#3B82F6"] as const; // vàng → xanh dương

  return ["#3B82F6", "#22C55E"] as const; // xanh dương → xanh lá
};

export const Fonts = {
  regular: "Roboto-Condensed-Regular",
  medium: "Roboto-Condensed-Medium",
  bold: "Roboto-Condensed-Bold",
};

export const Typography = {
  body: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.text_primary,
  },
  bodyMedium: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.text_primary,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.text_secondary,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 24,
    color: Colors.text_primary,
  },
};

export const FontSizes = {
  small: 14,
  medium: 18,
  large: 24,
  extraLarge: 44,
};

export const FontWeight = {
  medium: "500",
} as const;

export const SafeAreaViewStyles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
