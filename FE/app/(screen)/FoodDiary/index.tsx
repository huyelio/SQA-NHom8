import AIAnalyzeSection from "@/components/appComponents/foodDiary/AIAnalyzeSection";
import FoodResultSection from "@/components/appComponents/foodDiary/FoodResultSection";
import ManualFoodList from "@/components/appComponents/foodDiary/manual/ManualFoodList";
import GradientText from "@/components/appComponents/GradientText";
import LoadingScreen from "@/components/appComponents/Loading";
import PrimaryButton from "@/components/appComponents/PrimaryButton";
import { NotifyTypeEnum } from "@/constants/notify";
import { postAddFood, postDetectFoodPic } from "@/services/api/food/addFood";
import { notify } from "@/utils/notify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Mode = "ai" | "manual";

export default function FoodDiaryScreen() {
  const [mode, setMode] = useState<Mode>("ai");
  const [foodImage, setFoodImage] = useState<string | undefined>();
  const [data, setData] = useState<any>(null);
  const queryClient = useQueryClient();

  const uploadImage = useMutation({
    mutationFn: postDetectFoodPic,
    onSuccess: (res: any) => {
      notify("Phân tích thành công", NotifyTypeEnum.SUCCESS);
      setData(res.data);
    },
    onError: () => {
      notify("Lỗi kết nối máy chủ", NotifyTypeEnum.ERROR);
    },
  });

  const onSubmit = () => {
    if (!foodImage || uploadImage.isPending) return;
    uploadImage.mutate(foodImage);
  };

  const addFoodMutation = useMutation({
    mutationFn: postAddFood,
    onSuccess: () => {
      notify("Đã ghi nhận bữa ăn", NotifyTypeEnum.SUCCESS);
      queryClient.invalidateQueries({ queryKey: ["target"] });
      // reset state
      setFoodImage(undefined);
      setData(null);
    },
    onError: () => {
      notify("Ghi nhận bữa ăn thất bại", NotifyTypeEnum.ERROR);
    },
  });

  const handleAIConfirmConsumed = () => {
    if (!data || addFoodMutation.isPending) return;
    const detection = data?.detection?.[0];
    const nutrition = data?.nutrition_analysis?.total_nutrition;

    const payload = {
      log_date: dayjs().format("YYYY-MM-DD"),
      foods: [
        {
          food_name: detection.detected_class,
          calorie: nutrition.Calories,
          quantity: nutrition.quantity ?? 1,
          input_method: "ai",
        },
      ],
    };

    addFoodMutation.mutate(payload);
  };

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <GradientText
              colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
              style={styles.title}
            >
              Ghi bữa ăn
            </GradientText>

            {/* Toggle */}
            <View style={styles.toggleWrapper}>
              <ToggleTab
                title="Phân tích ảnh"
                active={mode === "ai"}
                onPress={() => setMode("ai")}
              />
              <ToggleTab
                title="Nhập thủ công"
                active={mode === "manual"}
                onPress={() => setMode("manual")}
              />
            </View>

            {/* Content */}
            {mode === "ai" && (
              <AIAnalyzeSection
                foodImage={foodImage}
                setFoodImage={(uri) => {
                  setFoodImage(uri);
                  setData(null);
                }}
              />
            )}

            {uploadImage.isPending && (
              <LoadingScreen message="Đang phân tích hình ảnh..." />
            )}

            {/* Result */}
            {mode === "ai" && <FoodResultSection data={data} />}

            {/* Actions */}
            {mode === "ai" && (
              <View style={{ marginBottom: 20 }}>
                <PrimaryButton
                  text="Phân tích hình ảnh"
                  onPress={onSubmit}
                  disabled={!foodImage || uploadImage.isPending}
                />
                {data &&
                  data?.nutrition_analysis?.total_nutrition.Calories !== 0 && (
                    <PrimaryButton
                      onPress={handleAIConfirmConsumed}
                      text="Ghi nhận đã tiêu thụ"
                    />
                  )}
              </View>
            )}
            {mode === "manual" && <ManualFoodList />}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ---------------- ToggleTab ---------------- */

const ToggleTab = ({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={[styles.toggleItem, active && styles.toggleItemActive]}
  >
    <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
      {title}
    </Text>
  </Pressable>
);

/* ---------------- Styles ---------------- */

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    marginBottom: 24,
  },

  toggleItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
  },

  toggleItemActive: {
    backgroundColor: "rgba(139,92,246,0.25)",
  },

  toggleText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "600",
  },

  toggleTextActive: {
    color: "#FFFFFF",
  },
});
