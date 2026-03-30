import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GradientText from "@/components/appComponents/GradientText";
import styles from "@/styles/medicationReminder/styles";

import PharmacyCartTab from "@/components/appComponents/Pharmacy/PharmacyCartTab";
import PharmacyOrdersTab from "@/components/appComponents/Pharmacy/PharmacyOrdersTab";
import PharmacyProductTab from "@/components/appComponents/Pharmacy/PharmacyProductTab";
import { Mode } from "@/types/pharmacy";

export default function PharmacyScreen() {
  const [mode, setMode] = useState<Mode>("product");
  const params = useLocalSearchParams();

  useEffect(() => {
    if (params.mode === "cart") {
      setMode("cart");
    }
  }, [params.added]);

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />

        <View style={styles.content}>
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={styles.title}
          >
            Mua thuốc
          </GradientText>

          {/* Toggle */}
          <View style={styles.toggleWrapper}>
            <Pressable
              onPress={() => setMode("product")}
              style={[
                styles.toggleItem,
                mode === "product" && styles.toggleItemActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  mode === "product" && styles.toggleTextActive,
                ]}
              >
                Sản phẩm
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setMode("cart")}
              style={[
                styles.toggleItem,
                mode === "cart" && styles.toggleItemActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  mode === "cart" && styles.toggleTextActive,
                ]}
              >
                Giỏ hàng
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setMode("orders")}
              style={[
                styles.toggleItem,
                mode === "orders" && styles.toggleItemActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  mode === "orders" && styles.toggleTextActive,
                ]}
              >
                Đơn hàng
              </Text>
            </Pressable>
          </View>

          {/* Content */}
          {mode === "product" && <PharmacyProductTab />}
          {mode === "cart" && <PharmacyCartTab setMode={setMode} />}
          {mode === "orders" && <PharmacyOrdersTab />}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
