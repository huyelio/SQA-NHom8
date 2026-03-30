import { Colors } from "@/styles/Common";
import React from "react";
import { Text, View } from "react-native";

const NutritionRow = ({ label, value }: { label: string; value: string }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    }}
  >
    <Text style={{ color: Colors.text_secondary }}>{label}</Text>
    <Text style={{ color: Colors.text_primary, fontWeight: "500" }}>
      {value}
    </Text>
  </View>
);

type Props = {
  data: any;
};

const FoodResultSection: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  const detection = data?.detection?.[0];
  const nutrition = data?.nutrition_analysis?.total_nutrition;

  if (!detection && !nutrition) return null;
  const getRs = () => {
    return data?.detection?.map((item: any) => item.detected_class).join(", ");
  };
  return (
    <View style={{ marginTop: 24 }}>
      {/* Detection */}
      {detection && (
        <View
          style={{
            backgroundColor: Colors.card,
            padding: 16,
            borderRadius: 16,
            marginBottom: 14,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: Colors.primary,
            }}
          >
            {getRs()}
          </Text>
        </View>
      )}

      {/* Nutrition */}
      {nutrition && (
        <View
          style={{
            backgroundColor: Colors.card,
            padding: 16,
            borderRadius: 16,
            marginBottom: 18,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: Colors.text_primary,
              marginBottom: 10,
            }}
          >
            Thông tin dinh dưỡng (ước tính)
          </Text>

          <NutritionRow label="Calo" value={`${nutrition.Calories ?? 0} kcal`} />
          <NutritionRow label="Carbs" value={`${nutrition.Carbs ?? 0} g`} />
          <NutritionRow label="Protein" value={`${nutrition.Protein ?? 0} g`} />
          <NutritionRow label="Chất béo" value={`${nutrition.Fat ?? 0} g`} />
        </View>
      )}
    </View>
  );
};

export default FoodResultSection;
