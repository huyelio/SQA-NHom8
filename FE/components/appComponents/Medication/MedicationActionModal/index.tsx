import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  name: string;
  time: string;
  dosage: string;
  onEdit: () => void;
  onDelete: () => void;
};

export default function MedicationActionModal({
  visible,
  onClose,
  name,
  time,
  dosage,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.sheet}>
          {/* Header */}
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.sub}>
            <Ionicons name="time-outline" size={14} /> {time} · {dosage}
          </Text>

          <View style={styles.divider} />

          <Action icon="create-outline" label="Sửa" onPress={onEdit} />

          <Action icon="trash-outline" label="Xóa" danger onPress={onDelete} />

          <View style={styles.divider} />

          <Pressable style={styles.cancelBtn} onPress={onClose}>
            <Text style={styles.cancelText}>Hủy</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const Action = ({
  icon,
  label,
  danger,
  onPress,
}: {
  icon: any;
  label: string;
  danger?: boolean;
  onPress: () => void;
}) => (
  <Pressable style={styles.actionRow} onPress={onPress}>
    <Ionicons
      name={icon}
      size={22}
      color={danger ? "#EF4444" : Colors.text_primary}
    />
    <Text style={[styles.actionText, danger && { color: "#EF4444" }]}>
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 24,
  },
  sheet: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 20,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.large,
    color: Colors.text_primary,
  },
  sub: {
    marginTop: 6,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: Colors.text_secondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 14,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    gap: 12,
  },
  actionText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
    color: Colors.text_primary,
  },
  cancelBtn: {
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelText: {
    color: Colors.text_secondary,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
  },
});
