import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SwipeConfirm } from "../../SwipeConfirm";

export type ScheduleCardMode = "edit" | "view";

type Props = {
  name: string;
  time: string;
  unit: string;
  dosage: number;
  mode?: ScheduleCardMode;
  onPress?: () => void;
  onDelete?: () => void;
  status?: number;
  onConfirmTaken?: () => void;
  isConfirming?: boolean;
};

const STATUS_CONFIG: Record<
  number,
  {
    label: string;
    bg: string;
    color: string;
    icon: string;
  }
> = {
  0: {
    label: "Chưa uống",
    bg: "#374151",
    color: "#FBBF24",
    icon: "alert-circle-outline",
  },
  2: {
    label: "Đã uống",
    bg: "#064E3B",
    color: "#34D399",
    icon: "checkmark-circle-outline",
  },
} as const;

export default function ScheduleCard({
  name,
  time,
  unit,
  dosage,
  mode = "view",
  onPress,
  onDelete,
  status,
  onConfirmTaken,
  isConfirming,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.9 }]}
    >
      {/* LEFT: icon + info */}
      <View style={styles.headerRow}>
        {/* LEFT */}
        <View style={styles.leftContainer}>
          <Ionicons
            name="medkit-outline"
            size={30}
            color={Colors.primary_2}
            style={styles.icon}
          />

          <View style={styles.textWrapper}>
            <Text style={styles.medName} numberOfLines={2}>
              {name || "Tên thuốc"}
            </Text>
            <Text style={styles.medDose}>
              {dosage} {unit}
            </Text>
          </View>
        </View>

        {/* RIGHT */}
        <View style={styles.rightContainer}>
          <View style={styles.timeBadge}>
            <Ionicons name="time-outline" size={16} color="#FFF" />
            <Text style={styles.timeText}>{time}</Text>
          </View>
          {mode === "edit" && (
            <Pressable onPress={onDelete} hitSlop={10} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={22} color="#FF6666" />
            </Pressable>
          )}
        </View>
      </View>
      {/* ACTION */}
      {mode === "view" && status === 0 && (
        <SwipeConfirm
          isLoading={isConfirming}
          onConfirm={() => onConfirmTaken?.()}
        />
      )}

      {mode === "view" && (status === 1 || status === 2) && (
        <View
          style={{
            marginTop: 14,
            paddingVertical: 10,
            borderRadius: 12,
            backgroundColor: "#052E16",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#4ADE80", fontSize: 14 }}>✓ Đã uống</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    marginBottom: 14,
  },

  /* LEFT */
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },

  icon: {
    marginRight: 12,
  },

  textWrapper: {
    flex: 1,
  },

  medName: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
    color: Colors.text_primary,
  },

  medDose: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.small,
    color: Colors.text_secondary,
    marginTop: 4,
  },

  /* RIGHT */
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  timeText: {
    marginLeft: 6,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.small,
    color: "#FFF",
  },

  deleteBtn: {
    padding: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },

  statusText: {
    marginLeft: 4,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.small,
  },
  confirmText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
    color: "#FFF",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  confirmBtn: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16A34A",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    width: "100%", // 🔥 quan trọng
  },

  addGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
});
