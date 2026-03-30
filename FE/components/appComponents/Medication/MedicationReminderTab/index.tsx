import { useNotificationPermission } from "@/hook/useNotificationPermission";
import {
  deleteScheduleById,
  getListPrescriptions,
  updateStatus,
} from "@/services/api/medication/medication";
import { Colors } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import LoadingScreen from "@/components/appComponents/Loading";
import styles from "@/styles/medicationReminder/styles";
import { MedicationSchedule } from "@/types/medication";
import ScheduleCard from "../ScheduleCard";
import { notify } from "@/utils/notify";
import { NotifyTypeEnum } from "@/constants/notify";
import MedicationActionModal from "../MedicationActionModal";

const generateDays = (startDate: Dayjs, range: number) => {
  return Array.from({ length: range }, (_, i) => {
    const d = startDate.add(i, "day");

    return {
      date: d,
      label: d.format("DD/MM"),
      weekday: d.locale("vi").format("ddd"),
    };
  });
};

export default function MedicationReminderTab() {
  const { status, requestPermission } = useNotificationPermission();

  const today = dayjs().startOf("day");
  const [selectedDay, setSelectedDay] = useState<Dayjs>(today);
  const [days] = useState(() => generateDays(today, 7));

  const dayScrollRef = useRef<ScrollView>(null);

  const [actionVisible, setActionVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] =
    useState<MedicationSchedule | null>(null);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  const hideDatePicker = () => setDatePickerVisible(false);
  const handleDatePicked = (date: Date) => {
    setSelectedDay(dayjs(date));
    hideDatePicker();
  };
  /* -------- DAY SCROLL -------- */
  useEffect(() => {
    const index = days.findIndex((d) => selectedDay.isSame(d.date, "day"));

    if (index !== -1 && dayScrollRef.current) {
      const itemWidth = 70;
      dayScrollRef.current.scrollTo({
        x: index * itemWidth,
        animated: true,
      });
    }
  }, [selectedDay]);

  /* ********** handle prescription list ********** */
  const { data, isLoading, refetch, isPending, isRefetching } = useQuery({
    queryKey: ["prescriptions", selectedDay],
    queryFn: () => getListPrescriptions(selectedDay.format("YYYY-MM-DD")),
  });
  const medicineList: MedicationSchedule[] = data ?? [];

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: number }) =>
      updateStatus(id, status),
    onSuccess: () => {
      notify("Cập nhật trạng thái thành công", NotifyTypeEnum.SUCCESS);
      setConfirmingId(null);
      refetch();
    },
    onError: (error: any) => {
      setConfirmingId(null);
      notify(error?.message || "Lỗi kết nối máy chủ", NotifyTypeEnum.ERROR);
    },
  });
  // Thêm thuốc
  const handleAddMedication = async () => {
    if (status !== "granted") {
      const granted = await requestPermission();
      if (!granted) return;
    }

    router.push("/(screen)/MedicationAddScreen");
  };
  // Xác nhận đã uống thuốc
  const handleConfirmTaken = (id: number, status: number) => {
    setConfirmingId(id);
    if (status === 0) status = 1;
    updateStatusMutation.mutate({ id, status });
  };
  // call api delete
  const deleteSchedule = useMutation({
    mutationFn: (id: number) => deleteScheduleById(id),
    onSuccess: () => {
      notify("Xóa lịch uống thuốc thành công", NotifyTypeEnum.SUCCESS);
      setActionVisible(false);
      setSelectedSchedule(null);
      refetch();
    },
    onError: (error: any) => {
      notify(error?.message || "Lỗi kết nối máy chủ", NotifyTypeEnum.ERROR);
    },
  });
  // Xoá lịch uống thuốc
  const handleDeleteSchedule = (id: number) => {
    deleteSchedule.mutate(id);
  };
  // sửa lịch
  const handleEditSchedule = (id: number) => {
    setActionVisible(false);
    setSelectedSchedule(null);
    router.push({
      pathname: "/(screen)/MedicationAddScreen",
      params: { id: id },
    });
  };

  /* ********************************************** */

  return (
    <>
      {/* DAY SELECTOR */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={dayScrollRef}
        style={styles.dayScroll}
      >
        {days.map((d, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedDay(d.date)}
            style={[
              styles.dayItem,
              selectedDay.isSame(d.date, "day") && styles.dayItemActive,
            ]}
          >
            <Text
              style={[
                styles.dayWeekText,
                selectedDay.isSame(d.date, "day") && styles.dayWeekTextActive,
              ]}
            >
              {d.weekday}
            </Text>

            <Text
              style={[
                styles.dayNumber,
                selectedDay.isSame(d.date, "day") && styles.dayNumberActive,
              ]}
            >
              {d.label}
            </Text>
          </Pressable>
        ))}

        <Pressable
          style={styles.dayItem}
          onPress={() => setDatePickerVisible(true)}
        >
          <Ionicons name="calendar-clear-outline" size={36} color="#fff" />
        </Pressable>
      </ScrollView>

      {/* LIST */}
      <ScrollView style={styles.listWrapper}>
        {isLoading || isRefetching ? (
          <LoadingScreen />
        ) : medicineList.length > 0 ? (
          medicineList.map((item) => (
            <ScheduleCard
              key={item.scheduleId}
              name={item.drugName}
              time={item.time}
              dosage={item.dosage}
              status={item.status}
              unit={item.unitName ?? "Viên"}
              onPress={() => {
                setSelectedSchedule(item);
                setActionVisible(true);
              }}
              onConfirmTaken={() =>
                handleConfirmTaken(item.scheduleId, item.status)
              }
              isConfirming={confirmingId === item.scheduleId}
            />
          ))
        ) : (
          <Text style={styles.placeholderText}>
            Không có lịch uống thuốc cho ngày này
          </Text>
        )}
        <View style={{ height: 100 }} />
        {/* ACTION BUTTONS */}
      </ScrollView>
      <View style={styles.floatingAction}>
        <Pressable style={styles.addButton} onPress={handleAddMedication}>
          <LinearGradient
            colors={[Colors.primary, Colors.primary_2]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.addGradient}
          >
            <Ionicons name="add" size={22} color="#fff" />
            <Text style={styles.addText}>Thêm thuốc</Text>
          </LinearGradient>
        </Pressable>
      </View>
      {/* DATE PICKER */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDatePicked}
        onCancel={() => setDatePickerVisible(false)}
        minimumDate={dayjs().startOf("day").toDate()}
        locale="vi-VN"
      />

      {/* ACTION MODAL */}
      {selectedSchedule && (
        <MedicationActionModal
          visible={actionVisible}
          onClose={() => {
            setActionVisible(false);
            setSelectedSchedule(null);
          }}
          name={selectedSchedule.drugName}
          time={selectedSchedule.time}
          dosage={`${selectedSchedule.dosage} ${
            selectedSchedule.unitName ?? "viên"
          }`}
          onEdit={() => handleEditSchedule(selectedSchedule.id)}
          onDelete={() => handleDeleteSchedule(selectedSchedule.id)}
        />
      )}
    </>
  );
}
