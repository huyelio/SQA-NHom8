import AddWeightModal from "@/components/appComponents/activities/AddWeightModal";
import GradientText from "@/components/appComponents/GradientText";
import { NotifyTypeEnum } from "@/constants/notify";
import { GoalForm, goalSchema } from "@/schema/goalSchema";
import { getWeightHistory } from "@/services/api/food/addFood";
import { updateProfile } from "@/services/api/profile/profile";
import styles from "@/styles/activities/WeightTrackingScreen/styles";
import { Colors } from "@/styles/Common";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function WeightGoalScreen() {
  const queryClient = useQueryClient();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalForm>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      height_cm: "",
      weight_kg: "",
      aim_weight: "",
      aim_day: "",
      day_of_activities: "",
      activity_level: "moderately_active",
    },
  });

  /* ===================== WEIGHT HISTORY (REUSE) ===================== */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weight-history"],
    queryFn: getWeightHistory,
    select: (data) => {
      const sorted = [...data.weight_history].sort(
        (a, b) =>
          new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
      );

      return sorted.slice(-7).map((item) => ({
        value: item.weight_kg,
        label: dayjs(item.recorded_at).format("DD/MM"),
      }));
    },
  });

  // if (isLoading || isError || !data?.length) return null;
  const dataWeight = data ? data : [];
  /* ===== Chart normalize ===== */
  const values = dataWeight.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const PADDING = 1;

  const yMin = Math.floor(min - PADDING);
  const yMax = Math.ceil(max + PADDING);
  const range = yMax - yMin;

  const chartData = dataWeight.map((item) => ({
    ...item,
    value: item.value - yMin,
  }));

  const yAxisLabels = Array.from(
    { length: range + 1 },
    (_, i) => `${yMin + i}`
  );

  const updateGoal = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      notify("Cập nhật thành công", NotifyTypeEnum.SUCCESS);
      router.back();
      queryClient.invalidateQueries({
        queryKey: ["target"],
      });
    },
    onError: () => {
      notify("Cập nhật thất bại", NotifyTypeEnum.ERROR);
    },
  });

  const onSubmit = async (form: GoalForm) => {
    const payload = {
      activity_level: form.activity_level,
      aim_weight: Number(form.aim_weight),
      aim_day: form.aim_day,
      day_of_activities: Number(form.day_of_activities),
      height_cm: Number(form.height_cm),
      weight_kg: Number(form.weight_kg),
    };
    updateGoal.mutate(payload);
  };

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* ===== TITLE ===== */}
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={styles.title}
          >
            Đặt mục tiêu
          </GradientText>

          {/* ===== CHART CONTEXT ===== */}
          <View style={styles.chartCard}>
            <Text style={styles.sectionTitle}>
              Diễn biến cân nặng 7 ngày gần nhất
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <LineChart
                data={chartData}
                width={screenWidth - 80}
                height={180}
                initialSpacing={20}
                spacing={50}
                curved
                thickness={2}
                color={Colors.primary_2}
                dataPointsRadius={4}
                dataPointsColor={Colors.primary}
                maxValue={range}
                stepValue={1}
                noOfSections={range}
                yAxisLabelTexts={yAxisLabels}
                yAxisLabelWidth={40}
                rulesType="dashed"
                rulesColor="rgba(255,255,255,0.12)"
                yAxisTextStyle={{
                  color: Colors.text_secondary,
                  fontSize: 12,
                }}
                xAxisLabelTextStyle={{
                  color: Colors.text_secondary,
                  fontSize: 12,
                }}
              />
            </ScrollView>
          </View>

          {/* ================= FORM ================= */}
          <View style={styles.chartCard}>
            <Text style={styles.sectionTitle}>Mục tiêu & kế hoạch</Text>

            {/* --- Thông tin cơ thể --- */}
            <Text style={styles.label}>Chiều cao (cm)</Text>
            <Controller
              control={control}
              name="height_cm"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={(text) =>
                    onChange(text.replace(/[^0-9.]/g, ""))
                  }
                  keyboardType="numeric"
                  placeholder="165"
                  placeholderTextColor="#666"
                  style={styles.input}
                />
              )}
            />
            {errors.height_cm && (
              <Text style={styles.error}>{errors.height_cm.message}</Text>
            )}

            <Text style={styles.label}>Cân nặng hiện tại (kg)</Text>
            <Controller
              control={control}
              name="weight_kg"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={(text) =>
                    onChange(text.replace(/[^0-9.]/g, ""))
                  }
                  keyboardType="numeric"
                  placeholder="62.5"
                  placeholderTextColor="#666"
                  style={styles.input}
                />
              )}
            />
            {errors.weight_kg && (
              <Text style={styles.error}>{errors.weight_kg.message}</Text>
            )}

            {/* --- Mục tiêu --- */}
            <Text style={styles.label}>Cân nặng mong muốn (kg)</Text>
            <Controller
              control={control}
              name="aim_weight"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={(text) =>
                    onChange(text.replace(/[^0-9.]/g, ""))
                  }
                  keyboardType="numeric"
                  placeholder="58"
                  placeholderTextColor="#666"
                  style={styles.input}
                />
              )}
            />
            {errors.aim_weight && (
              <Text style={styles.error}>{errors.aim_weight.message}</Text>
            )}

            <Text style={styles.label}>Ngày đạt mục tiêu</Text>
            <Controller
              control={control}
              name="aim_day"
              render={({ field: { value, onChange } }) => (
                <>
                  <Pressable onPress={() => setDatePickerVisible(true)}>
                    <TextInput
                      value={value}
                      editable={false}
                      placeholder="Chọn ngày"
                      placeholderTextColor="#666"
                      style={styles.input}
                      pointerEvents="none"
                    />
                  </Pressable>

                  <DateTimePickerModal
                    isVisible={datePickerVisible}
                    mode="date"
                    minimumDate={new Date()}
                    onConfirm={(date) => {
                      onChange(dayjs(date).format("YYYY-MM-DD"));
                      setDatePickerVisible(false);
                    }}
                    onCancel={() => setDatePickerVisible(false)}
                    locale="vi-VN"
                  />
                </>
              )}
            />

            {errors.aim_day && (
              <Text style={styles.error}>{errors.aim_day.message}</Text>
            )}

            {/* --- Kế hoạch luyện tập --- */}
            <Text style={styles.label}>Số ngày tập / tuần</Text>
            <Controller
              control={control}
              name="day_of_activities"
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value}
                  onChangeText={(text) =>
                    onChange(text.replace(/[^0-9.]/g, ""))
                  }
                  keyboardType="numeric"
                  placeholder="3"
                  placeholderTextColor="#666"
                  style={styles.input}
                />
              )}
            />
            {errors.day_of_activities && (
              <Text style={styles.error}>
                {errors.day_of_activities.message}
              </Text>
            )}

            <Text style={styles.label}>Mức độ hoạt động</Text>
            <Controller
              control={control}
              name="activity_level"
              render={({ field: { value, onChange } }) => (
                <View style={styles.activityRow}>
                  {[
                    { key: "sedentary", label: "Ít vận động" },
                    { key: "lightly_active", label: "Vận động nhẹ" },
                    { key: "moderately_active", label: "Vận động vừa" },
                    { key: "very_active", label: "Vận động nhiều" },
                    { key: "extremely_active", label: "Vận động cực nhiều" },
                  ].map((item) => (
                    <Pressable
                      key={item.key}
                      onPress={() => onChange(item.key as any)}
                      style={[
                        styles.activityItem,
                        value === item.key && styles.activityItemActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.activityText,
                          value === item.key && styles.activityTextActive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            />
          </View>

          {/* ===== SAVE ===== */}
          <Pressable onPress={handleSubmit(onSubmit)}>
            <LinearGradient
              colors={[Colors.primary, Colors.primary_2]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>Cập nhật</Text>
            </LinearGradient>
          </Pressable>

          <View style={{ height: 24 }} />
        </ScrollView>
      </SafeAreaView>

      {/* <AddWeightModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(d) => console.log(d)}
      /> */}
    </LinearGradient>
  );
}
