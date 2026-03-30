import PrimaryButton from "@/components/appComponents/PrimaryButton";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AddManualFoodModal({
  visible,
  onClose,
  onSubmit,
  isLoading,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (food: {
    food_name: string;
    calorie: number;
    quantity: number;
  }) => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState({
    food_name: "",
    calorie: "",
    quantity: "1",
  });

  // reset form khi mở modal
  useEffect(() => {
    if (visible) {
      setForm({ food_name: "", calorie: "", quantity: "1" });
    }
  }, [visible]);

  const handleSubmit = () => {
    if (isLoading) return;
    onSubmit({
      food_name: form.food_name.trim(),
      calorie: Number(form.calorie),
      quantity: Number(form.quantity),
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* HEADER */}
          <Text style={styles.title}>Thêm món ăn</Text>

          {/* FOOD NAME */}
          <View style={styles.field}>
            <Text style={styles.label}>Tên món ăn</Text>
            <TextInput
              value={form.food_name}
              onChangeText={(v) => setForm({ ...form, food_name: v })}
              style={styles.input}
              placeholderTextColor="#666"
            />
          </View>

          {/* CALORIES */}
          <View style={styles.field}>
            <Text style={styles.label}>Calories (kcal)</Text>
            <TextInput
              value={form.calorie}
              onChangeText={(v) => setForm({ ...form, calorie: v })}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          {/* QUANTITY */}
          <View style={styles.field}>
            <Text style={styles.label}>Số lượng</Text>
            <TextInput
              value={form.quantity}
              onChangeText={(v) => setForm({ ...form, quantity: v })}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>

          {/* ACTIONS */}
          <PrimaryButton
            text={isLoading ? "Đang lưu..." : "Lưu món ăn"}
            onPress={handleSubmit}
            disabled={isLoading}
          />

          <Pressable onPress={onClose} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Hủy</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  field: {
    marginBottom: 14,
  },

  label: {
    color: "#9CA3AF",
    fontSize: 13,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#0D0D0D",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: "#fff",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  cancelBtn: {
    marginTop: 20,
    alignItems: "center",
  },

  cancelText: {
    color: "#9CA3AF",
    fontSize: 15,
  },
});
