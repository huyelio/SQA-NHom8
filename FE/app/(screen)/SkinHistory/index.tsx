import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
  Modal,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import GradientText from "@/components/appComponents/GradientText";
import { Colors } from "@/styles/Common";
import styles from "@/styles/SkinHistoryScreen/styles";
import { getSkinAnalysisHistory } from "@/services/api/AI/checkFace";

/* ===================== TYPES ===================== */
type Suggestions = {
  diet?: string[];
  lifestyle?: string[];
};

export type SkinAnalysisItem = {
  id: number;
  aiDiagnosis: string;
  aiConfidence: number; // 0..1
  analysisImageUrl: string;
  createdAt: string; // ISO
  doctorNote: string | null;
  suggestions?: Suggestions;
};

/* ===================== HELPERS ===================== */
function formatConfidence(x: number) {
  const p = Math.round((x ?? 0) * 100);
  return `${p}%`;
}

function diagnosisLabel(d: string) {
  // tuỳ bạn map thêm
  if (d === "Dark Circle") return "Quầng thâm";
  return d;
}

function confidenceTone(x: number) {
  // badge theo độ tin cậy
  if (x >= 0.75)
    return {
      bg: "rgba(34,197,94,0.14)",
      bd: "rgba(34,197,94,0.35)",
      fg: "#22c55e",
    };
  if (x >= 0.5)
    return {
      bg: "rgba(6,182,212,0.14)",
      bd: "rgba(6,182,212,0.35)",
      fg: Colors.primary_2,
    };
  return {
    bg: "rgba(239,68,68,0.12)",
    bd: "rgba(239,68,68,0.28)",
    fg: Colors.accent_red,
  };
}

export default function SkinHistoryScreen() {
  const [selected, setSelected] = useState<SkinAnalysisItem | null>(null);

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: ["skin-analysis-history"],
    queryFn: getSkinAnalysisHistory,
  });

  const list = useMemo(() => {
    const arr = data ?? [];
    // sort mới nhất lên đầu
    return [...arr].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [data]);

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.centerBox}>
          <Text style={styles.mutedText}>Đang tải lịch sử...</Text>
        </View>
      );
    }
    if (isError) {
      return (
        <View style={styles.centerBox}>
          <Text style={styles.mutedText}>Không tải được lịch sử</Text>
          <Pressable onPress={() => refetch()} style={styles.retryBtn}>
            <Text style={styles.retryText}>
              {isRefetching ? "Đang thử lại..." : "Thử lại"}
            </Text>
          </Pressable>
        </View>
      );
    }
    return (
      <View style={styles.emptyWrapper}>
        <View style={styles.emptyIconWrap}>
          <Ionicons
            name="sparkles-outline"
            size={46}
            color={Colors.primary_2}
          />
        </View>
        <Text style={styles.emptyTitle}>Chưa có lịch sử phân tích</Text>
        <Text style={styles.emptyDesc}>
          Hãy chụp ảnh và phân tích để theo dõi tình trạng da theo thời gian.
        </Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: SkinAnalysisItem }) => {
    const tone = confidenceTone(item.aiConfidence);

    return (
      <Pressable onPress={() => setSelected(item)} style={styles.card}>
        <Image
          source={{ uri: item.analysisImageUrl }}
          style={styles.thumb}
          contentFit="cover"
        />

        <View style={{ flex: 1 }}>
          <View style={styles.rowTop}>
            <Text style={styles.diagnosis} numberOfLines={1}>
              {diagnosisLabel(item.aiDiagnosis)}
            </Text>

            <View
              style={[
                styles.badge,
                { backgroundColor: tone.bg, borderColor: tone.bd },
              ]}
            >
              <Text style={[styles.badgeText, { color: tone.fg }]}>
                {formatConfidence(item.aiConfidence)}
              </Text>
            </View>
          </View>

          <Text style={styles.timeText}>
            {dayjs(item.createdAt).format("HH:mm • DD/MM/YYYY")}
          </Text>

          {/* <Text style={styles.noteText} numberOfLines={2}>
            {item.doctorNote?.trim()
              ? `Ghi chú BS: ${item.doctorNote}`
              : "Ghi chú BS: (chưa có)"}
          </Text> */}

          <View style={styles.suggestionPreview}>
            <Ionicons
              name="leaf-outline"
              size={16}
              color={Colors.text_secondary}
            />
            <Text style={styles.previewText} numberOfLines={1}>
              {item.suggestions?.lifestyle?.[0] ||
                item.suggestions?.diet?.[0] ||
                "Xem gợi ý chăm sóc"}
            </Text>
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color={Colors.text_secondary}
        />
      </Pressable>
    );
  };

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <View style={styles.header}>
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={styles.title}
          >
            Lịch sử phân tích da
          </GradientText>
        </View>

        <FlatList
          data={list}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderItem}
          contentContainerStyle={
            list.length ? styles.listContent : styles.listEmpty
          }
          ListEmptyComponent={renderEmpty}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor="#fff"
            />
          }
        />

        {/* ===== DETAIL MODAL ===== */}
        <Modal
          visible={!!selected}
          animationType="slide"
          onRequestClose={() => setSelected(null)}
        >
          <SafeAreaView
            edges={["top"]}
            style={{ flex: 1, backgroundColor: "#000" }}
          >
            <LinearGradient
              colors={["#0D0D0D", "#111122", "#0F1125"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{ flex: 1 }}
            >
              <View style={styles.modalHeader}>
                <Pressable
                  onPress={() => setSelected(null)}
                  style={styles.modalBackBtn}
                >
                  <Ionicons name="close" size={24} color="#fff" />
                </Pressable>
                <Text style={styles.modalTitle}>Chi tiết phân tích</Text>
              </View>

              {selected ? (
                <ScrollView
                  contentContainerStyle={styles.modalContent}
                  showsVerticalScrollIndicator={false}
                >
                  <Image
                    source={{ uri: selected.analysisImageUrl }}
                    style={styles.hero}
                    contentFit="cover"
                  />

                  <View style={styles.modalCard}>
                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Chẩn đoán</Text>
                      <Text style={styles.modalValue}>
                        {diagnosisLabel(selected.aiDiagnosis)}
                      </Text>
                    </View>

                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Độ tin cậy</Text>
                      <Text style={styles.modalValue}>
                        {formatConfidence(selected.aiConfidence)}
                      </Text>
                    </View>

                    <View style={styles.modalRow}>
                      <Text style={styles.modalLabel}>Thời gian</Text>
                      <Text style={styles.modalValue}>
                        {dayjs(selected.createdAt).format("HH:mm • DD/MM/YYYY")}
                      </Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Ghi chú bác sĩ</Text>
                    <Text style={styles.paragraph}>
                      {selected.doctorNote?.trim()
                        ? selected.doctorNote
                        : "Chưa có ghi chú từ bác sĩ."}
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Gợi ý lối sống</Text>
                    {selected.suggestions?.lifestyle?.length ? (
                      selected.suggestions.lifestyle.map((s, idx) => (
                        <View key={`life-${idx}`} style={styles.bulletRow}>
                          <View style={styles.bulletDot} />
                          <Text style={styles.bulletText}>{s}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.paragraph}>Chưa có gợi ý.</Text>
                    )}

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Gợi ý dinh dưỡng</Text>
                    {selected.suggestions?.diet?.length ? (
                      selected.suggestions.diet.map((s, idx) => (
                        <View key={`diet-${idx}`} style={styles.bulletRow}>
                          <View style={styles.bulletDot} />
                          <Text style={styles.bulletText}>{s}</Text>
                        </View>
                      ))
                    ) : (
                      <Text style={styles.paragraph}>Chưa có gợi ý.</Text>
                    )}
                  </View>

                  <View style={{ height: 28 }} />
                </ScrollView>
              ) : null}
            </LinearGradient>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}
