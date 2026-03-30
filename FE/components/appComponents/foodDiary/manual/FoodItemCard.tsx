import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function FoodItemCard({
  item,
  onDelete,
}: {
  item: any;
  onDelete: () => void;
}) {
  return (
    <LinearGradient
      colors={["rgba(139,92,246,0.15)", "rgba(17,17,17,0.95)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      {/* LEFT */}
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.food_name}</Text>

        <View style={styles.subRow}>
          <Text style={styles.meta}>{item.quantity} khẩu phần</Text>

          {item.input_method === "ai" && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>AI</Text>
            </View>
          )}
        </View>
      </View>

      {/* CALORIES */}
      <View style={styles.calorieBox}>
        <Text style={styles.calorieValue}>{item.calorie}</Text>
        <Text style={styles.calorieLabel}>kcal</Text>
      </View>

      {/* ACTIONS */}
      <View style={styles.actionCol}>
        <Pressable onPress={onDelete} style={styles.iconBtn}>
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  subRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  meta: {
    color: "#9CA3AF",
    fontSize: 13,
    marginRight: 8,
  },

  badge: {
    backgroundColor: "rgba(139,92,246,0.25)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },

  badgeText: {
    color: "#C4B5FD",
    fontSize: 11,
    fontWeight: "600",
  },

  calorieBox: {
    alignItems: "center",
    marginHorizontal: 16,
  },

  calorieValue: {
    color: "#FBBF24",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 20,
  },

  calorieLabel: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  actionCol: {
    justifyContent: "space-between",
  },

  iconBtn: {
    padding: 6,
  },
});
