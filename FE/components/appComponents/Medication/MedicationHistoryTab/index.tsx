import { getHistory } from "@/services/api/medication/medication";
import { Colors } from "@/styles/Common";
import { styles } from "@/styles/medicationReminder/MedicationHistoryScreen/styles";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { Modal, Pressable, SectionList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MedicineHistoryScreen() {
  const now = dayjs();
  const [month, setMonth] = useState<number>(now.month() + 1); // 1-12
  const [year, setYear] = useState<number>(now.year());
  const [open, setOpen] = useState(false);

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["history", month, year],
    queryFn: () => getHistory("month", month, year),
  });

  const history = data?.history ?? [];
  const statistics = data?.statistics ?? {};

  const sections = useMemo(
    () =>
      history.map((item: any) => ({
        title: item.date,
        data: item.schedules,
      })),
    [history]
  );

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={{ flex: 1, marginTop: -20 }}
        sections={sections}
        keyExtractor={(item) => item.scheduleId.toString()}
        renderSectionHeader={({ section }) => (
          <DateHeader date={section.title} />
        )}
        renderItem={({ item }) => <HistoryItem item={item} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ gap: 12 }}>
            {/* Filter month/year card */}
            <MonthYearCard
              month={month}
              year={year}
              onPress={() => setOpen(true)}
              subtitle={isLoading || isRefetching ? "Đang tải dữ liệu..." : ""}
            />

            {/* Overview */}
            <OverviewCards statistics={statistics} />
          </View>
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                Chưa có lịch sử trong tháng này
              </Text>
            </View>
          ) : null
        }
      />

      <MonthYearModal
        visible={open}
        initialMonth={month}
        initialYear={year}
        onClose={() => setOpen(false)}
        onApply={(m, y) => {
          setMonth(m);
          setYear(y);
          setOpen(false);
        }}
      />
    </SafeAreaView>
  );
}

function MonthYearCard({
  month,
  year,
  onPress,
  subtitle,
}: {
  month: number;
  year: number;
  onPress: () => void;
  subtitle?: string;
}) {
  return (
    <Pressable onPress={onPress} style={styles.filterCard}>
      <View style={{ flex: 1 }}>
        <Text style={styles.filterTitle}>
          Tháng {month}/{year}
        </Text>
        {!!subtitle && <Text style={styles.filterSub}>{subtitle}</Text>}
      </View>

      <View style={styles.filterChip}>
        <Text style={styles.filterChipText}>Đổi</Text>
      </View>
    </Pressable>
  );
}

function MonthYearModal({
  visible,
  initialMonth,
  initialYear,
  onClose,
  onApply,
}: {
  visible: boolean;
  initialMonth: number;
  initialYear: number;
  onClose: () => void;
  onApply: (month: number, year: number) => void;
}) {
  const [m, setM] = useState(initialMonth);
  const [y, setY] = useState(initialYear);

  // Mỗi lần mở modal, reset theo current selection
  React.useEffect(() => {
    if (visible) {
      setM(initialMonth);
      setY(initialYear);
    }
  }, [visible, initialMonth, initialYear]);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = dayjs().year();
  const years = Array.from({ length: 9 }, (_, i) => currentYear - 4 + i); // -4 .. +4

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={() => {}}>
          <Text style={styles.modalTitle}>Chọn tháng & năm</Text>

          <Text style={styles.modalLabel}>Tháng</Text>
          <View style={styles.grid}>
            {months.map((item) => {
              const active = item === m;
              return (
                <Pressable
                  key={item}
                  onPress={() => setM(item)}
                  style={[styles.gridItem, active && styles.gridItemActive]}
                >
                  <Text
                    style={[styles.gridText, active && styles.gridTextActive]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.modalLabel}>Năm</Text>
          <View style={styles.grid}>
            {years.map((item) => {
              const active = item === y;
              return (
                <Pressable
                  key={item}
                  onPress={() => setY(item)}
                  style={[styles.gridItem, active && styles.gridItemActive]}
                >
                  <Text
                    style={[styles.gridText, active && styles.gridTextActive]}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.modalActions}>
            <Pressable onPress={onClose} style={[styles.btn, styles.btnGhost]}>
              <Text style={styles.btnGhostText}>Hủy</Text>
            </Pressable>

            <Pressable
              onPress={() => onApply(m, y)}
              style={[styles.btn, styles.btnPrimary]}
            >
              <Text style={styles.btnPrimaryText}>Áp dụng</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function OverviewCards({ statistics }: any) {
  const data = [
    { label: "Đã uống", value: statistics.totalTaken ?? 0 },
    { label: "Bỏ lỡ", value: statistics.skipped ?? 0 },
    { label: "Đúng giờ", value: statistics.onTime ?? 0 },
    { label: "Uống muộn", value: statistics.late ?? 0 },
  ];

  return (
    <View style={styles.overviewContainer}>
      {data.map((item) => (
        <View key={item.label} style={styles.overviewCard}>
          <Text style={styles.overviewValue}>{item.value}</Text>
          <Text style={styles.overviewLabel}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

function DateHeader({ date }: any) {
  return (
    <View style={styles.dateHeader}>
      <Text style={styles.dateText}>{dayjs(date).format("DD/MM/YYYY")}</Text>
    </View>
  );
}

function HistoryItem({ item }: any) {
  const statusConfig: Record<number, { text: string; color: string }> = {
    0: { text: "Chưa uống", color: Colors.border },
    1: { text: "Đúng giờ", color: Colors.primary_2 },
    2: { text: "Uống muộn", color: Colors.accent_red },
  };

  const status = statusConfig[item.status] ?? statusConfig[0];

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.drugName}>{item.drugName}</Text>
        <Text style={styles.subText}>
          {item.dosage} {item.unitName} · {item.time}
        </Text>
        {!!item.note && <Text style={styles.note}>{item.note}</Text>}
      </View>

      <View style={[styles.statusBadge, { backgroundColor: status.color }]}>
        <Text style={styles.statusText}>{status.text}</Text>
      </View>
    </View>
  );
}
