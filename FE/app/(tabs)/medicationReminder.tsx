import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GradientText from "@/components/appComponents/GradientText";

import styles from "@/styles/medicationReminder/styles";
import MedicationReminderTab from "@/components/appComponents/Medication/MedicationReminderTab";
import MedicineHistoryScreen from "@/components/appComponents/Medication/MedicationHistoryTab";

export default function MedicationReminderScreen() {
  const [mode, setMode] = useState<"reminder" | "history">("reminder");

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
            Nhắc uống thuốc
          </GradientText>
          <View style={styles.toggleWrapper}>
            <Pressable
              onPress={() => setMode("reminder")}
              style={[
                styles.toggleItem,
                mode === "reminder" && styles.toggleItemActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  mode === "reminder" && styles.toggleTextActive,
                ]}
              >
                Nhắc uống thuốc
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setMode("history")}
              style={[
                styles.toggleItem,
                mode === "history" && styles.toggleItemActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  mode === "history" && styles.toggleTextActive,
                ]}
              >
                Lịch sử
              </Text>
            </Pressable>
          </View>
          {mode === "reminder" && <MedicationReminderTab />}
          {mode === "history" && <MedicineHistoryScreen />}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
