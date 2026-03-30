import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GradientText from "@/components/appComponents/GradientText";
import {
  createWorkoutPlan,
  getWorkoutPlan,
} from "@/services/api/AI/workoutPlant";
import { Colors } from "@/styles/Common";
import styles from "@/styles/WorkoutScheduleScreen/styles";

/* ===================== TYPES ===================== */
type WorkoutType =
  | "Lower – Sức mạnh (Strength)"
  | "Cardio + Core"
  | "Rest"
  | "Upper – Sức mạnh (Strength)"
  | "Lower – Hypertrophy / Glute focus"
  | "Upper – Hypertrophy";

type Exercise = {
  name: string;
  reps?: number;
  sets?: number;
  duration?: string; // "30 minutes"
};

type DayPlan = {
  workout_type: WorkoutType;
  exercises?: Exercise[];
  notes?: string;
};

type WorkoutPlan = {
  disclaimer: string;
  explanation: string;
  weekly_schedule: Record<string, DayPlan>;
};

type WorkoutPlanResponse = {
  message?: string;
  type?: "plan_created" | "no_plan" | string;
  plan?: WorkoutPlan | null;
};

/* ===================== HELPERS ===================== */
const DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const VI_DAY: Record<string, string> = {
  Monday: "Thứ 2",
  Tuesday: "Thứ 3",
  Wednesday: "Thứ 4",
  Thursday: "Thứ 5",
  Friday: "Thứ 6",
  Saturday: "Thứ 7",
  Sunday: "Chủ nhật",
};

function workoutTypeLabel(t: WorkoutType) {
  if (t === "Lower – Sức mạnh (Strength)") return "Sức mạnh";
  if (t === "Cardio + Core") return "Cardio";
  if (t === "Upper – Sức mạnh (Strength)") return "Sức mạnh";
  if (t === "Lower – Hypertrophy / Glute focus" || t === "Upper – Hypertrophy")
    return "Hypertrophy";
  if (t === "Rest") return "Nghỉ ngơi";
  return "Nghỉ / Hồi phục";
}

function workoutTypeColor(t: WorkoutType) {
  if (
    t === "Lower – Sức mạnh (Strength)" ||
    t === "Upper – Sức mạnh (Strength)"
  )
    return Colors.accent_purple;
  if (t === "Cardio + Core") return Colors.primary_2;
  if (t === "Lower – Hypertrophy / Glute focus" || t === "Upper – Hypertrophy")
    return Colors.accent_red;
  if (t === "Rest") return Colors.text_secondary;
  return Colors.text_secondary;
}

export default function WorkoutScheduleScreen() {
  const qc = useQueryClient();

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["workout-plan"],
    queryFn: getWorkoutPlan,
  });

  const createMutation = useMutation({
    mutationFn: createWorkoutPlan,
    onSuccess: async () => {
      // refetch plan sau khi tạo
      await qc.invalidateQueries({ queryKey: ["workout-plan"] });
    },
  });

  const plan = data?.plan ?? null;
  const hasPlan = !!plan?.weekly_schedule;

  const sortedDays = useMemo(() => {
    const schedule = plan?.weekly_schedule ?? {};
    // sắp xếp theo thứ chuẩn
    return DAY_ORDER.filter((d) => schedule[d]).map((d) => ({
      key: d,
      label: VI_DAY[d] ?? d,
      detail: schedule[d],
    }));
  }, [plan]);

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={styles.title}
          >
            Quản lý lịch tập
          </GradientText>

          {/* Loading */}
          {isLoading ? (
            <View style={styles.centerBox}>
              <Text style={styles.mutedText}>Đang tải dữ liệu...</Text>
            </View>
          ) : isError ? (
            <View style={styles.centerBox}>
              <Text style={styles.mutedText}>Không tải được lịch tập</Text>

              <Pressable onPress={() => refetch()} style={styles.retryBtn}>
                <Text style={styles.retryText}>
                  {isRefetching ? "Đang thử lại..." : "Thử lại"}
                </Text>
              </Pressable>
            </View>
          ) : !hasPlan ? (
            /* ================= EMPTY STATE ================= */
            <View style={styles.emptyWrapper}>
              <View style={styles.emptyIconWrap}>
                <Ionicons
                  name="barbell-outline"
                  size={46}
                  color={Colors.primary_2}
                />
              </View>

              <Text style={styles.emptyTitle}>Bạn chưa có lịch tập</Text>
              <Text style={styles.emptyDesc}>
                Tạo lịch tập để theo dõi và duy trì thói quen vận động mỗi ngày.
              </Text>

              <Pressable
                disabled={createMutation.isPending}
                onPress={() => createMutation.mutate()}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  pressed && { opacity: 0.9 },
                  createMutation.isPending && { opacity: 0.6 },
                ]}
              >
                <LinearGradient
                  colors={[Colors.primary, Colors.primary_2]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.primaryBtnBg}
                >
                  <Ionicons name="add" size={18} color="#fff" />
                  <Text style={styles.primaryBtnText}>
                    {createMutation.isPending ? "Đang tạo..." : "Tạo lịch tập"}
                  </Text>
                </LinearGradient>
              </Pressable>

              {createMutation.isError ? (
                <Text style={styles.errorText}>
                  Tạo lịch tập thất bại. Thử lại nhé.
                </Text>
              ) : null}
            </View>
          ) : (
            /* ================= HAS PLAN ================= */
            <>
              {/* PLAN HEADER */}
              <View style={styles.planHeaderCard}>
                <Text style={styles.planExplain}>{plan?.explanation}</Text>

                <View style={styles.planActions}>
                  <Pressable
                    onPress={() => refetch()}
                    style={({ pressed }) => [
                      styles.smallBtn,
                      pressed && { opacity: 0.85 },
                    ]}
                  >
                    <Text style={styles.smallBtnText}>
                      {isRefetching ? "Đang tải..." : "Tải lại"}
                    </Text>
                  </Pressable>

                  <Pressable
                    disabled={createMutation.isPending}
                    onPress={() => createMutation.mutate()}
                    style={({ pressed }) => [
                      styles.smallBtnPrimary,
                      pressed && { opacity: 0.9 },
                      createMutation.isPending && { opacity: 0.6 },
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

              {/* WEEK SCHEDULE */}
              {sortedDays.map((d) => {
                const detail = d.detail!;
                const typeColor = workoutTypeColor(detail.workout_type);

                return (
                  <View key={d.key} style={styles.dayCard}>
                    <View style={styles.dayHeader}>
                      <Text style={styles.dayTitle}>{d.label}</Text>

                      <View
                        style={[styles.typeBadge, { borderColor: typeColor }]}
                      >
                        <Text
                          style={[styles.typeBadgeText, { color: typeColor }]}
                        >
                          {workoutTypeLabel(detail.workout_type)}
                        </Text>
                      </View>
                    </View>

                    {/* REST */}
                    {detail.workout_type === "Rest" ? (
                      <Text style={styles.restText}>
                        {detail.notes ?? "Nghỉ ngơi & hồi phục nhẹ."}
                      </Text>
                    ) : null}

                    {/* EXERCISES */}
                    {detail.exercises?.length ? (
                      <View style={{ gap: 10, marginTop: 10 }}>
                        {detail.exercises.map((ex: any, idx: number) => (
                          <View
                            key={`${ex.name}-${idx}`}
                            style={styles.exerciseRow}
                          >
                            <View style={{ flex: 1 }}>
                              <Text style={styles.exerciseName}>{ex.name}</Text>
                              <Text style={styles.exerciseMeta}>
                                {ex.duration
                                  ? `${ex.duration} • ${ex.sets ?? 1} set`
                                  : `${ex.sets ?? 0} x ${ex.reps ?? 0} reps`}
                              </Text>
                            </View>

                            <Ionicons
                              name="chevron-forward"
                              size={18}
                              color={Colors.text_secondary}
                            />
                          </View>
                        ))}
                      </View>
                    ) : detail.workout_type !== "Rest" ? (
                      <Text style={styles.mutedText}>Chưa có bài tập</Text>
                    ) : null}
                  </View>
                );
              })}

              <View style={{ height: 24 }} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
