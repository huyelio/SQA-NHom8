import GradientText from "@/components/appComponents/GradientText";
import LoadingScreen from "@/components/appComponents/Loading";
import AddTimeModal from "@/components/appComponents/Medication/AddTimeModal";
import CheckBoxDaysModal from "@/components/appComponents/Medication/CheckBoxDaysModal";
import ScheduleCard from "@/components/appComponents/Medication/ScheduleCard";
import {
  FREQUENCY,
  FREQUENCY_OPTIONS,
  UNIT_DISPLAY,
  UNIT_OPTIONS,
  WEEK_DAYS_DISPLAY,
} from "@/constants/medication";
import { NotifyTypeEnum } from "@/constants/notify";
import { MEDICATION_NOTI_QUERY_KEY } from "@/hook/notification/notificationService";
import { medicationSchema } from "@/schema/medicationSchema";
import {
  getListDrug,
  getSingleDrugById,
  postSingleDrug,
  updateSingleDrug,
} from "@/services/api/medication/medication";
import { Colors } from "@/styles/Common";
import styles from "@/styles/medicationReminder/MedicationAddScreen/styles";
import { notify } from "@/utils/notify";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MedicationAddScreen() {
  const [isStartDatePickerVisible, setStartDatePickerVisible] =
    useState<boolean>(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] =
    useState<boolean>(false);
  const [showWeekModal, setShowWeekModal] = useState<boolean>(false);
  const [addTimeVisible, setAddTimeVisible] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  /* ********** handle get drug list ********** */
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ["drugs", keyword],
      queryFn: ({ pageParam }) => getListDrug(pageParam, keyword),
      initialPageParam: 0,
      getNextPageParam: (lastPage: any) => {
        if (!lastPage || lastPage.last === true) return undefined;
        // pageNumber tiếp theo = lastPage.number + 1
        return lastPage.number + 1;
      },
    });
  /* ****************************************** */
  /* ********** handle form ********** */
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      drug_name: "",
      unit_id: 1,
      start_date: new Date(),
      end_date: undefined,
      note: "",
      frequency_type: "DAILY",
      schedules: [],
      days_of_week: [],
    },
  });

  const { data: editData, isLoading } = useQuery({
    queryKey: ["singleDrug", id],
    queryFn: () => getSingleDrugById(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (!editData) return;
    setKeyword(editData.drug_name ?? "");
    reset({
      drug_name: editData.drug_name ?? "",
      unit_id: editData.unit_id ?? 1,

      start_date: editData.start_date
        ? dayjs(editData.start_date).toDate()
        : new Date(),

      end_date: editData.end_date
        ? dayjs(editData.end_date).toDate()
        : undefined,

      frequency_type: editData.frequency_type ?? "DAILY",
      interval_days: editData.interval_days ?? undefined,
      days_of_week: editData.days_of_week ?? [],
      note: editData.note ?? "",

      schedules:
        editData.schedules?.map((s: any) => ({
          time: s.time, // "22:33"
          dosage: s.dosage, // 1.0
        })) ?? [],
    });
  }, [editData, reset]);

  const startDate = watch("start_date");
  const endDate = watch("end_date");
  const schedules = watch("schedules");
  const daysOfWeek = watch("days_of_week", []);
  // call api thêm mới
  const addMedication = useMutation({
    mutationFn: (data: any) => postSingleDrug(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["prescriptions"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: MEDICATION_NOTI_QUERY_KEY,
      });
      notify("Tạo lịch uống thuốc thành công!", NotifyTypeEnum.SUCCESS);
      router.back();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  //call api sawa
  const updateMedication = useMutation({
    mutationFn: (data: any) => updateSingleDrug(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["prescriptions"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: MEDICATION_NOTI_QUERY_KEY,
      });
      notify("Cập nhật lịch uống thuốc thành công!", NotifyTypeEnum.SUCCESS);
      router.back();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  // submit form
  const onSubmit = (data: any) => {
    const payload = {
      drug_name: data.drug_name,
      unit_id: data.unit_id,
      start_date: dayjs(data.start_date).format("YYYY-MM-DD"),
      end_date: data.end_date
        ? dayjs(data.end_date).format("YYYY-MM-DD")
        : null,
      note: data.note,
      frequency_type: data.frequency_type,
      interval_days: data.interval_days ?? null,
      days_of_week: data.days_of_week,
      schedules: data.schedules,
    };

    if (id) updateMedication.mutate(payload);
    else addMedication.mutate(payload);
  };

  const handleDeleteSchedule = (index: number) => {
    const updated = schedules.filter((_, i) => i !== index);
    setValue("schedules", updated);
  };
  /* ********************************* */

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <GradientText
              colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
              style={styles.title}
            >
              Thêm lịch nhắc
            </GradientText>

            {/* ===================== TÊN THUỐC ===================== */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Tên thuốc <Text style={styles.requiredMark}>*</Text>
              </Text>
              <Controller
                control={control}
                name="drug_name"
                render={({ field: { onChange, value } }) => {
                  const drugPages = data?.pages ?? [];
                  const drugItems = drugPages.flatMap((p: any) => p.content);

                  return (
                    <View style={{ marginBottom: 8 }}>
                      {/* === INPUT VỪA SEARCH VỪA CHO NHẬP TỰ DO === */}
                      <TextInput
                        style={styles.selectBox}
                        placeholder="Nhập hoặc chọn thuốc..."
                        placeholderTextColor="#999"
                        value={value}
                        onChangeText={(text) => {
                          onChange(text); // Cho phép nhập tên tùy ý
                          setKeyword(text); // Dùng keyword để search API
                          refetch(); // Reload danh sách
                        }}
                        onFocus={() => setOpen(true)} // Mở popup khi focus input
                      />

                      {/* === MODAL LỰA CHỌN THUỐC === */}
                      <Modal visible={open} transparent animationType="fade">
                        <View style={styles.modalOverlay}>
                          <View style={styles.modalBox}>
                            {/* Search bar đồng bộ UI */}
                            <TextInput
                              placeholder="Tìm thuốc..."
                              placeholderTextColor="#8E8E8E"
                              value={keyword}
                              onChangeText={(t) => {
                                setKeyword(t);
                                onChange(t);
                                refetch();
                              }}
                              style={[styles.input, { marginBottom: 12 }]}
                            />

                            {/* List thuốc */}
                            <FlatList
                              data={drugItems}
                              keyExtractor={(item) => item.id.toString()}
                              onEndReached={() => {
                                if (hasNextPage && !isFetchingNextPage)
                                  fetchNextPage();
                              }}
                              onEndReachedThreshold={0.2}
                              ListFooterComponent={
                                isFetchingNextPage ? (
                                  <ActivityIndicator
                                    style={{ marginVertical: 10 }}
                                  />
                                ) : null
                              }
                              renderItem={({ item }) => (
                                <Pressable
                                  style={styles.modalItem}
                                  onPress={() => {
                                    onChange(item.name);
                                    setOpen(false);
                                  }}
                                >
                                  <Text style={styles.modalItemLabel}>
                                    {item.name}
                                  </Text>
                                  {item.title ? (
                                    <Text style={styles.modalItemSubLabel}>
                                      {item.title}
                                    </Text>
                                  ) : null}
                                </Pressable>
                              )}
                            />

                            <Pressable
                              onPress={() => setOpen(false)}
                              style={styles.modalCloseButton}
                            >
                              <Text style={styles.modalCloseText}>Đóng</Text>
                            </Pressable>
                          </View>
                        </View>
                      </Modal>
                    </View>
                  );
                }}
              />
              {errors.drug_name && (
                <Text style={styles.errorText}>{errors.drug_name.message}</Text>
              )}
            </View>

            {/* ===================== ĐƠN VỊ ===================== */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Đơn vị <Text style={styles.requiredMark}>*</Text>
              </Text>
              <Controller
                control={control}
                name="unit_id"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.selectBox]}>
                    <Picker
                      selectedValue={value}
                      onValueChange={(val) => onChange(val)}
                      style={[styles.textPicker, { color: "#FFF" }]}
                      dropdownIconColor="#FFF"
                    >
                      {UNIT_OPTIONS.map((u) => (
                        <Picker.Item
                          style={[styles.textPicker, { color: "#000" }]}
                          label={u.label}
                          value={u.id}
                          key={u.id}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
              />
              {errors.unit_id && (
                <Text style={styles.errorText}>{errors.unit_id.message}</Text>
              )}
            </View>

            {/* ===================== NGÀY BẮT ĐẦU ===================== */}
            <Pressable
              onPress={() => setStartDatePickerVisible(true)}
              style={styles.inputContainer}
            >
              <Text style={styles.label}>
                Ngày bắt đầu uống <Text style={styles.requiredMark}>*</Text>
              </Text>

              <Text style={[styles.input, { lineHeight: 50 }]}>
                {startDate.toLocaleDateString()}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setEndDatePickerVisible(true)}
              style={styles.inputContainer}
            >
              <Text style={styles.label}>Ngày ngừng uống</Text>

              <Text style={[styles.input, { lineHeight: 50 }]}>
                {endDate ? endDate.toLocaleDateString() : undefined}
              </Text>
            </Pressable>

            {/* ===================== TẦN SUẤT ===================== */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Tần suất <Text style={styles.requiredMark}>*</Text>
              </Text>

              <Controller
                control={control}
                name="frequency_type"
                render={({ field: { onChange, value } }) => (
                  <View style={[styles.selectBox]}>
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={[styles.textPicker, { color: "#FFF" }]}
                      dropdownIconColor="#FFF"
                    >
                      {FREQUENCY_OPTIONS.map((item) => (
                        <Picker.Item
                          style={[styles.textPicker, { color: "#000" }]}
                          key={item.value}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
              />
              {errors.frequency_type && (
                <Text style={styles.errorText}>
                  {errors.frequency_type.message}
                </Text>
              )}
            </View>
            {watch("frequency_type") === FREQUENCY.WEEKLY && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Chọn các ngày trong tuần{" "}
                  <Text style={styles.requiredMark}>*</Text>
                </Text>

                <Pressable
                  onPress={() => setShowWeekModal(true)}
                  style={[styles.selectBox]}
                >
                  <Text style={{ color: "#FFF" }}>
                    {daysOfWeek.length > 0
                      ? daysOfWeek.map((d) => WEEK_DAYS_DISPLAY[d]).join(", ")
                      : "Chọn ngày"}
                  </Text>
                </Pressable>

                {errors.days_of_week && (
                  <Text style={styles.errorText}>
                    {errors.days_of_week.message}
                  </Text>
                )}
              </View>
            )}

            {watch("frequency_type") === FREQUENCY.INTERVAL && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Khoảng cách ngày <Text style={styles.requiredMark}>*</Text>
                </Text>
                <Controller
                  control={control}
                  name="interval_days"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      value={value ? String(value) : ""}
                      onChangeText={(text) => {
                        const numeric = text.replace(/[^0-9]/g, "");
                        onChange(numeric);
                      }}
                      keyboardType="number-pad"
                    />
                  )}
                />
                {errors.interval_days && (
                  <Text style={styles.errorText}>
                    {errors.interval_days.message}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ghi chú</Text>

              <Controller
                control={control}
                name="note"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      { height: 80, textAlignVertical: "top" },
                    ]}
                    multiline
                    numberOfLines={4}
                    placeholder="Nhập ghi chú (nếu có)"
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />

              {errors.note && (
                <Text style={styles.errorText}>{errors.note.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Thời gian
                <Text style={styles.requiredMark}>*</Text>
              </Text>

              {schedules.length > 0
                ? schedules.map((s, index) => (
                    <ScheduleCard
                      key={index}
                      name={getValues("drug_name")}
                      time={s.time}
                      unit={UNIT_DISPLAY[watch("unit_id")]}
                      dosage={s.dosage}
                      mode="edit"
                      onPress={() => {
                        setEditingIndex(index);
                        setAddTimeVisible(true);
                      }}
                      onDelete={() => handleDeleteSchedule(index)}
                    />
                  ))
                : null}
              {schedules.length === 0 && (
                <Pressable
                  onPress={() => {
                    setEditingIndex(null);
                    setAddTimeVisible(true);
                  }}
                  style={styles.addTimeCard}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={22}
                    color={Colors.primary_2}
                  />
                  <Text style={styles.addTimeCardText}>Thêm giờ uống</Text>
                </Pressable>
              )}
              {errors.schedules && (
                <Text style={styles.errorText}>{errors.schedules.message}</Text>
              )}
            </View>
            {/* ===================== LƯU ===================== */}
            <Pressable
              style={[
                styles.saveButtonContainer,
                addMedication.isPending && { opacity: 0.5 },
              ]}
              onPress={handleSubmit(onSubmit)}
              disabled={addMedication.isPending}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primary_2]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.saveButton}
              >
                <Text style={styles.saveText}>Lưu</Text>
              </LinearGradient>
            </Pressable>
          </ScrollView>
        )}
      </SafeAreaView>

      {/* ===================== DATE PICKER ===================== */}
      <DateTimePickerModal
        isVisible={isStartDatePickerVisible}
        mode="date"
        onConfirm={(value) => {
          setStartDatePickerVisible(false);
          setValue("start_date", value);
        }}
        onCancel={() => setStartDatePickerVisible(false)}
        locale="vi-VN"
      />

      <DateTimePickerModal
        isVisible={isEndDatePickerVisible}
        mode="date"
        onConfirm={(value) => {
          setEndDatePickerVisible(false);
          setValue("end_date", value);
        }}
        onCancel={() => setEndDatePickerVisible(false)}
        locale="vi-VN"
      />

      <CheckBoxDaysModal
        showWeekModal={showWeekModal}
        setShowWeekModal={setShowWeekModal}
        setValue={setValue}
        control={control}
      />

      <AddTimeModal
        visible={addTimeVisible}
        setVisible={setAddTimeVisible}
        schedules={schedules}
        trigger={trigger}
        unit={watch("unit_id")}
        setValue={setValue}
        editingIndex={editingIndex}
      />
    </LinearGradient>
  );
}
