// HealthScreen.tsx
import GradientText from "@/components/appComponents/GradientText";
import {
  CHAR_HEIGHT,
  DAILY_CALO_GOAL,
  DAILY_STEP_GOAL,
} from "@/constants/countStep";
import { useStepCounter } from "@/hook/active/stepCountSensor";
import { useActiveMinutesUnified } from "@/hook/active/useActiveMinutes";
import { useStandHours } from "@/hook/active/useStandHours";
import { usePedometerPermission } from "@/hook/useStepCountSensorPermission";
import { getTargetInfor } from "@/services/api/profile/profile";
import { Colors, getGradientByPercent } from "@/styles/Common";
import styles from "@/styles/countStep/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HealthScreen() {
  // xin quyền hệ thống
  const { status, requestPermission } = usePedometerPermission();
  const { stepsToday } = useStepCounter(status === "granted");
  const { activeMinutes } = useActiveMinutesUnified(status === "granted");
  const { stoodHours } = useStandHours(status === "granted", activeMinutes);

  useEffect(() => {
    if (Platform.OS === "android" && status === "undetermined") {
      requestPermission();
    }
  }, [status]);

  const { data: targetData } = useQuery({
    queryKey: ["target"],
    queryFn: () => getTargetInfor(),
  });
  const latestLog = React.useMemo(() => {
    if (!targetData?.logs?.length) return null;
    return targetData.logs[targetData.logs.length - 1];
  }, [targetData]);

  const caloriePercent = React.useMemo(() => {
    if (!latestLog || !latestLog.target_calorie) return 0;
    return Math.min(latestLog.total_calorie_in / latestLog.target_calorie, 1);
  }, [latestLog]);

  const weeklyCaloData = React.useMemo(() => {
    if (!targetData?.logs?.length) return [];

    const last7Logs = targetData.logs.slice(-7);

    return last7Logs.map((log: any) => ({
      day: dayjs(log.log_date).format("DD/MM"),
      value: log.steps_calorie_out ?? 0,
    }));
  }, [targetData]);

  const maxCaloInWeek = React.useMemo(() => {
    if (!weeklyCaloData.length) return DAILY_CALO_GOAL;
    return Math.max(
      ...weeklyCaloData.map((d: any) => d.value),
      DAILY_CALO_GOAL
    );
  }, [weeklyCaloData]);

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        {/* Background Decor */}
        <View style={styles.circleTopRight} />
        <View style={styles.circleBottomLeft} />
        <ScrollView
          style={styles.safeArea}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <GradientText
              colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
              style={[styles.title]}
            >
              Mục tiêu tuần này
            </GradientText>
            <View style={styles.progressContainer}>
              {/* Progress numbers left-right */}
              <View style={styles.progressHeader}>
                <Text style={styles.progressNumber}>0 kcal</Text>
                <Text style={styles.progressNumber}>
                  {latestLog?.target_calorie ?? 0} kcal
                </Text>
              </View>

              {/* PROGRESS BAR */}
              <View style={styles.progressBarBackground}>
                <LinearGradient
                  colors={getGradientByPercent(caloriePercent)}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={[
                    styles.progressBarFill,
                    { width: `${caloriePercent * 100}%` },
                  ]}
                />
              </View>

              {/* CURRENT VALUE */}
              <Text style={styles.progressCurrent}>
                {latestLog?.total_calorie_in ?? 0} kcal
              </Text>
            </View>
            <GradientText
              colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
              style={[styles.title, { marginTop: 32 }]}
            >
              7 ngày gần nhất
            </GradientText>

            {/* CUSTOM BAR CHART */}
            <View style={styles.chartContainer}>
              {weeklyCaloData.map((item: any, index: number) => {
                const percent = Math.min(item.value / maxCaloInWeek, 1);
                const barHeight = Math.max(percent * CHAR_HEIGHT, 6); // min height
                const colors = getGradientByPercent(percent);

                return (
                  <View key={index} style={styles.barItem}>
                    <LinearGradient
                      colors={colors}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      style={[styles.bar, { height: barHeight }]}
                    />
                    <Text style={styles.dayLabel}>{item.day}</Text>
                  </View>
                );
              })}
            </View>
            {/* METRICS CARD */}
            <View style={styles.metricsCard}>
              <View style={styles.metricsRow}>
                <View style={styles.metricBlock}>
                  <Ionicons
                    name="flame-outline"
                    size={20}
                    color={Colors.accent_red}
                    style={styles.metricIcon}
                  />
                  <Text style={styles.metricLabel}>Calo</Text>
                  <Text style={styles.metricValue}>
                    {latestLog?.steps_calorie_out ?? 0}
                  </Text>
                  <Text style={styles.metricSub}>/500 kcal</Text>
                </View>

                <View style={styles.metricBlock}>
                  <MaterialCommunityIcons
                    name="shoe-print"
                    size={20}
                    color={Colors.primary_2}
                    style={styles.metricIcon}
                  />
                  <Text style={styles.metricLabel}>Số bước</Text>
                  <Text style={styles.metricValue}>{stepsToday}</Text>
                  <Text style={styles.metricSub}>/{DAILY_STEP_GOAL} bước</Text>
                </View>

                <View style={styles.metricBlock}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={Colors.accent_blue}
                    style={styles.metricIcon}
                  />
                  <Text style={styles.metricLabel}>Vận động</Text>
                  <Text style={styles.metricValue}>{activeMinutes}</Text>
                  <Text style={styles.metricSub}>/30 phút</Text>
                </View>
              </View>

              <View style={styles.standSection}>
                <Text style={styles.standText}>Đứng {stoodHours} giờ</Text>
              </View>
            </View>
            <Pressable
              style={styles.foodActionCard}
              onPress={() => {
                router.push("/(screen)/WeightTracking");
              }}
            >
              <Ionicons name="flag-outline" size={24} color={Colors.primary} />

              <View style={styles.foodTextWrapper}>
                <Text style={styles.foodTitle}>Đặt mục tiêu</Text>
                <Text style={styles.foodDesc}>
                  Đặt mục tiêu cho tuần tới của bạn
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.text_secondary}
              />
            </Pressable>
            <Pressable
              style={styles.foodActionCard}
              onPress={() => {
                router.push("/(screen)/FoodDiary");
              }}
            >
              <Ionicons
                name="restaurant-outline"
                size={24}
                color={Colors.accent_red}
              />

              <View style={styles.foodTextWrapper}>
                <Text style={styles.foodTitle}>Ghi bữa ăn</Text>
                <Text style={styles.foodDesc}>
                  Tính calo từ món bạn đã ăn hôm nay
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.text_secondary}
              />
            </Pressable>
            <Pressable
              style={styles.foodActionCard}
              onPress={() => {
                router.push("/(screen)/AIHealthAdvisor");
              }}
            >
              <Ionicons
                name="sparkles-outline"
                size={24}
                color={Colors.primary}
              />

              <View style={styles.foodTextWrapper}>
                <Text style={styles.foodTitle}>Tham khảo AI</Text>
                <Text style={styles.foodDesc}>
                  Gợi ý dinh dưỡng & vận động phù hợp với bạn
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.text_secondary}
              />
            </Pressable>
            {/* Quản lý lịch tập */}
            <Pressable
              style={styles.foodActionCard}
              onPress={() => {
                router.push("/(screen)/WorkoutScheduleScreen");
              }}
            >
              <Ionicons
                name="barbell-outline"
                size={24}
                color={Colors.accent_blue}
              />

              <View style={styles.foodTextWrapper}>
                <Text style={styles.foodTitle}>Quản lý lịch tập</Text>
                <Text style={styles.foodDesc}>
                  Theo dõi và nhắc lịch tập luyện hàng ngày
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.text_secondary}
              />
            </Pressable>

            {/* Quản lý lịch ăn */}
            <Pressable
              style={styles.foodActionCard}
              onPress={() => {
                router.push("/(screen)/MealPlanScreen");
              }}
            >
              <Ionicons
                name="nutrition-outline"
                size={24}
                color={Colors.accent_red}
              />

              <View style={styles.foodTextWrapper}>
                <Text style={styles.foodTitle}>Quản lý lịch ăn</Text>
                <Text style={styles.foodDesc}>
                  Lên kế hoạch bữa ăn & nhắc giờ ăn
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.text_secondary}
              />
            </Pressable>

            <Pressable
              style={styles.foodActionCard}
              onPress={() => {
                router.push("/(screen)/SkinHistory");
              }}
            >
              <Ionicons
                name="happy-outline"
                size={24}
                color={Colors.accent_purple}
              />

              <View style={styles.foodTextWrapper}>
                <Text style={styles.foodTitle}>Tình trạng da mặt</Text>
                <Text style={styles.foodDesc}>
                  Theo dõi lịch sử da mặt theo ngày & tuần
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.text_secondary}
              />
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
