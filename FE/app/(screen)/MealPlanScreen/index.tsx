import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import GradientText from "@/components/appComponents/GradientText";
import { Colors } from "@/styles/Common";
import styles from "@/styles/MealPlanScreen/styles";
import { createMealPlan, getMealPlan } from "@/services/api/AI/mealPlan";

/* ===================== TYPES ===================== */
type Macro = {
  carbs_g: number;
  fat_g: number;
  protein_g: number;
};

type Nutrition = {
  calories: number;
  macros: Macro;
};

type Ingredient = {
  name: string;
  amount_g: number;
};

type Meal = {
  description: string;
  ingredients: Ingredient[];
  nutrition: Nutrition;
};

type DayMeals = {
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
  snacks?: Meal[];
};

type MealPlan = {
  disclaimer: string;
  explanation: string;
  daily_meals: Record<string, DayMeals>;
};

type MealPlanResponse = {
  type?: "plan_created" | "no_plan";
  plan?: MealPlan | null;
};

/* ===================== HELPERS ===================== */
const DAY_ORDER = [
  "day1",
  "day2",
  "day3",
  "day4",
  "day5",
  "day6",
  "day7",
] as const;

const VI_DAY: Record<string, string> = {
  day1: "Thứ 2",
  day2: "Thứ 3",
  day3: "Thứ 4",
  day4: "Thứ 5",
  day5: "Thứ 6",
  day6: "Thứ 7",
  day7: "Chủ nhật",
};

function mealLabel(key: string) {
  if (key === "breakfast") return "Bữa sáng";
  if (key === "lunch") return "Bữa trưa";
  if (key === "dinner") return "Bữa tối";
  return "Bữa phụ";
}

/* ===================== COMPONENT ===================== */
export default function MealPlanScreen() {
  const qc = useQueryClient();

  const { data, isLoading, isError, refetch, isRefetching } =
    useQuery<MealPlanResponse>({
      queryKey: ["meal-plan"],
      queryFn: getMealPlan,
    });

  const createMutation = useMutation({
    mutationFn: createMealPlan,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["meal-plan"] });
    },
  });

  const plan = data?.plan ?? null;
  const hasPlan = !!plan?.daily_meals;

  const sortedDays = useMemo(() => {
    const meals = plan?.daily_meals ?? {};
    return DAY_ORDER.filter((d) => meals[d]).map((d) => ({
      key: d,
      label: VI_DAY[d],
      meals: meals[d],
    }));
  }, [plan]);

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={styles.title}
          >
            Quản lý thực đơn
          </GradientText>

          {/* ===== LOADING ===== */}
          {isLoading ? (
            <View style={styles.centerBox}>
              <Text style={styles.mutedText}>Đang tải dữ liệu...</Text>
            </View>
          ) : isError ? (
            /* ===== ERROR ===== */
            <View style={styles.centerBox}>
              <Text style={styles.mutedText}>Không tải được thực đơn</Text>
              <Pressable onPress={() => refetch()} style={styles.retryBtn}>
                <Text style={styles.retryText}>Thử lại</Text>
              </Pressable>
            </View>
          ) : !hasPlan ? (
            /* ===== EMPTY ===== */
            <View style={styles.emptyWrapper}>
              <View style={styles.emptyIconWrap}>
                <Ionicons
                  name="restaurant-outline"
                  size={46}
                  color={Colors.primary_2}
                />
              </View>

              <Text style={styles.emptyTitle}>Bạn chưa có thực đơn</Text>
              <Text style={styles.emptyDesc}>
                Tạo thực đơn để kiểm soát dinh dưỡng mỗi ngày
              </Text>

              <Pressable
                disabled={createMutation.isPending}
                onPress={() => createMutation.mutate()}
                style={styles.primaryBtn}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primary_2]}
                  style={styles.primaryBtnBg}
                >
                  <Ionicons name="add" size={18} color="#fff" />
                  <Text style={styles.primaryBtnText}>
                    {createMutation.isPending ? "Đang tạo..." : "Tạo thực đơn"}
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          ) : (
            <>
              {/* ===== PLAN HEADER ===== */}
              <View style={styles.planHeaderCard}>
                <Text style={styles.planExplain}>{plan.explanation}</Text>
                <View style={styles.planActions}>
                  {/* ===== TẢI LẠI ===== */}
                  <Pressable
                    disabled={isRefetching || createMutation.isPending}
                    onPress={() => refetch()}
                    style={({ pressed }) => [
                      styles.retryBtn,
                      pressed && { opacity: 0.85 },
                      (isRefetching || createMutation.isPending) && {
                        opacity: 0.5,
                      },
                    ]}
                  >
                    <Text style={styles.retryText}>
                      {isRefetching ? "Đang tải..." : "Tải lại"}
                    </Text>
                  </Pressable>

                  {/* ===== TẠO LẠI TUẦN ===== */}
                  <Pressable
                    disabled={createMutation.isPending || isRefetching}
                    onPress={() => createMutation.mutate()}
                    style={({ pressed }) => [
                      styles.smallBtnPrimary,
                      pressed && { opacity: 0.9 },
                      (createMutation.isPending || isRefetching) && {
                        opacity: 0.6,
                      },
                    ]}
                  >
                    <Text style={styles.smallBtnPrimaryText}>
                      {createMutation.isPending
                        ? "Đang tạo..."
                        : "Tạo lại tuần"}
                    </Text>
                  </Pressable>
                </View>
              </View>

              {/* ===== DAYS ===== */}
              {sortedDays.map((d) => (
                <View key={d.key} style={styles.dayCard}>
                  <Text style={styles.dayTitle}>{d.label}</Text>

                  {Object.entries(d.meals).map(([mealKey, meal]: any) => {
                    if (mealKey === "snacks") {
                      return meal.map((snack: Meal, idx: number) => (
                        <MealCard
                          key={`snack-${idx}`}
                          label="Bữa phụ"
                          meal={snack}
                        />
                      ));
                    }

                    return (
                      <MealCard
                        key={mealKey}
                        label={mealLabel(mealKey)}
                        meal={meal}
                      />
                    );
                  })}
                </View>
              ))}

              <View style={{ height: 24 }} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

/* ===================== SUB COMPONENT ===================== */
function MealCard({ label, meal }: { label: string; meal: Meal }) {
  return (
    <View style={styles.mealCard}>
      <View style={styles.mealHeader}>
        <Text style={styles.mealLabel}>{label}</Text>
        <Text style={styles.calories}>{meal.nutrition.calories} kcal</Text>
      </View>

      <Text style={styles.mealDesc}>{meal.description}</Text>

      <View style={styles.macroRow}>
        <Text style={styles.macroText}>
          🍚 {meal.nutrition.macros.carbs_g}g
        </Text>
        <Text style={styles.macroText}>
          🥩 {meal.nutrition.macros.protein_g}g
        </Text>
        <Text style={styles.macroText}>🥑 {meal.nutrition.macros.fat_g}g</Text>
      </View>

      <View style={styles.ingredientList}>
        {meal.ingredients.map((i, idx) => (
          <Text key={idx} style={styles.ingredientText}>
            • {i.name} ({i.amount_g}g)
          </Text>
        ))}
      </View>
    </View>
  );
}
