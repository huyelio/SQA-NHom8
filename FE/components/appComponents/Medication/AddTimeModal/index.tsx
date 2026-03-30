import { UNIT_DISPLAY } from "@/constants/medication";
import { AddReminderMedicationForm } from "@/schema/medicationSchema";
import { Colors, Typography } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import {
  Modal,
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<AddReminderMedicationForm>;
  trigger: UseFormTrigger<AddReminderMedicationForm>;
  schedules: { time: string; dosage: number }[];
  editingIndex: number | null;
  unit: number;
};

export default function AddTimeModal({
  visible,
  setVisible,
  schedules,
  setValue,
  trigger,
  editingIndex,
  unit,
}: Props) {
  const isEditing = editingIndex !== null;
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [time, setTime] = useState("08:00");
  const [dosage, setDosage] = useState("1");
  const [error, setError] = useState("");

  /** Load data khi edit */
  useEffect(() => {
    if (isEditing && editingIndex !== null && schedules?.[editingIndex]) {
      setTime(schedules[editingIndex].time);
      setDosage(String(schedules[editingIndex].dosage));
    }
  }, [editingIndex, schedules, isEditing]);

  const close = () => {
    setVisible(false);

    if (!isEditing) {
      setTime("08:00");
      setDosage("1");
    }
  };

  // validate liều lượng
  useEffect(() => {
    if (Number(dosage) < 1) {
      setError("Liều lượng phải lớn hơn 0");
    } else {
      setError("");
    }
  }, [dosage]);

  const handleSave = () => {
    // 1. validate liều lượng
    if (error) return;

    const updated = Array.isArray(schedules) ? [...schedules] : [];
    const item = { time, dosage: Number(dosage) };

    // 2. tìm index trùng giờ (trừ chính nó khi edit)
    const duplicateIndex = updated.findIndex(
      (s, index) => s.time === time && (!isEditing || index !== editingIndex)
    );

    // 3. nếu trùng giờ → ghi đè
    if (duplicateIndex !== -1) {
      updated[duplicateIndex] = item;
      setValue("schedules", updated);
      close();
      return;
    }

    // 4. edit bình thường
    if (isEditing && editingIndex !== null) {
      updated[editingIndex] = item;
    } else {
      // 5. add mới
      updated.push(item);
    }

    setValue("schedules", updated, { shouldValidate: true });
    trigger("schedules");

    close();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* ===== HEADER ===== */}
          <Text style={styles.title}>
            {isEditing ? "Chỉnh sửa giờ uống" : "Thêm giờ uống thuốc"}
          </Text>

          {/* ===== TIME ===== */}
          <Pressable
            style={styles.timeCard}
            onPress={() => setTimePickerVisible(true)}
          >
            <Ionicons name="time-outline" size={22} color={Colors.primary_2} />
            <Text style={styles.timeText}>{time}</Text>
          </Pressable>

          {/* ===== DOSAGE ===== */}
          <View
            style={[
              styles.inputWrapper,
              error && { borderWidth: 1, borderColor: Colors.accent_red },
            ]}
          >
            <Ionicons
              name="medkit-outline"
              size={20}
              color={Colors.text_secondary}
            />
            <TextInput
              value={dosage}
              keyboardType="numeric"
              onChangeText={(t) => setDosage(t.replace(/[^0-9]/g, ""))}
              style={styles.input}
              placeholder="Liều lượng"
              placeholderTextColor={Colors.text_secondary}
            />
            <Text style={styles.unit}>{UNIT_DISPLAY[unit]}</Text>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {/* ===== ACTIONS ===== */}
          <View style={styles.actions}>
            <Pressable onPress={close}>
              <Text style={styles.cancelText}>Hủy</Text>
            </Pressable>

            <Pressable onPress={handleSave}>
              <LinearGradient
                colors={[Colors.primary, Colors.primary_2]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.saveBtn}
              >
                <Text style={styles.saveText}>
                  {isEditing ? "Lưu" : "Thêm"}
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>

      {/* ===== TIME PICKER ===== */}
      <DateTimePickerModal
        isVisible={timePickerVisible}
        mode="time"
        display="spinner"
        onConfirm={(d) => {
          const hh = String(d.getHours()).padStart(2, "0");
          const mm = String(d.getMinutes()).padStart(2, "0");
          setTime(`${hh}:${mm}`);
          setTimePickerVisible(false);
        }}
        onCancel={() => setTimePickerVisible(false)}
        locale="vi-VN"
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  title: {
    ...Typography.title,
    marginBottom: 16,
  },

  /* Time */
  timeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#262626",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },

  timeText: {
    ...Typography.bodyMedium,
  },

  /* Dosage */
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    gap: 8,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    ...Typography.body,
  },

  unit: {
    ...Typography.label,
  },

  errorText: {
    marginTop: -10,
    ...Typography.body,
    color: Colors.accent_red,
  },

  /* Actions */
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cancelText: {
    ...Typography.body,
    color: Colors.text_secondary,
  },

  saveBtn: {
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 30,
  },

  saveText: {
    ...Typography.bodyMedium,
    color: "#FFF",
  },
});
