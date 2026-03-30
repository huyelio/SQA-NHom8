import { SKIN_LABEL_VI } from "@/constants/AIFace";
import { NotifyTypeEnum } from "@/constants/notify";
import { saveAnalyze } from "@/services/api/AI/checkFace";
import { Colors } from "@/styles/Common";
import styles from "@/styles/imageDiagnosis/resultStyles";
import { notify } from "@/utils/notify";
import { useMutation } from "@tanstack/react-query";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type Props = {
  data: any;
  setData: (v: any) => void;
  setSelectedImage: (v: string | undefined) => void;
};

const ResultSection: React.FC<Props> = ({
  data,
  setData,
  setSelectedImage,
}) => {
  const [activeTab, setActiveTab] = useState<"diet" | "lifestyle">("diet");
  const [saved, setSaved] = useState<boolean>(false);
  if (!data) return null;
  const dietTips: string[] = data?.lifestyle_suggestions?.diet ?? [];
  const lifestyleTips: string[] = data?.lifestyle_suggestions?.lifestyle ?? [];

  const handleTryAgain = () => {
    setData(null);
    setSelectedImage(undefined);
  };

  const saveAnalyzeMutation = useMutation({
    mutationFn: (data: any) => saveAnalyze(data),
    onSuccess: (response: any) => {
      notify("Lưu kết quả thành công", NotifyTypeEnum.SUCCESS);
      setSaved(true);
    },
    onError: (error: any) => {
      notify(
        "Đã xảy ra lỗi khi lưu kết quả. Vui lòng thử lại sau.",
        NotifyTypeEnum.SUCCESS
      );
    },
  });

  const handleSave = () => {
    saveAnalyzeMutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Kết quả phân tích</Text>

      <Text style={styles.summaryText}>{data.health_issue_info}</Text>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Detection Cards */}
        <Text style={styles.sectionTitle}>Vấn đề được phát hiện</Text>

        {/* ✅ IMAGE FROM URL */}
        <Image
          source={{ uri: data.annotated_image_url }}
          style={styles.resultImage}
          contentFit="contain"
        />

        {data.detection?.map((item: any, index: number) => (
          <View key={index} style={styles.detectCard}>
            <Text style={styles.detectTitle}>
              {SKIN_LABEL_VI[item.detected_class]}
            </Text>
            <Text style={styles.detectDetail}>
              Độ tin cậy: {(item.confidence * 100).toFixed(1)}%
            </Text>
          </View>
        ))}

        {/* Suggestions Section */}
        <Text style={styles.sectionTitle}>Gợi ý cải thiện</Text>

        {/* Tabs */}
        <View style={styles.tabWrapper}>
          <Pressable
            onPress={() => setActiveTab("diet")}
            style={[styles.tab, activeTab === "diet" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "diet" && styles.activeTabText,
              ]}
            >
              Dinh dưỡng
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab("lifestyle")}
            style={[styles.tab, activeTab === "lifestyle" && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "lifestyle" && styles.activeTabText,
              ]}
            >
              Lối sống
            </Text>
          </Pressable>
        </View>

        {/* Tab Content */}
        <View style={styles.listBox}>
          {(activeTab === "diet" ? dietTips : lifestyleTips).map(
            (tip: string, index: number) => (
              <Text key={index} style={styles.bulletItem}>
                • {tip}
              </Text>
            )
          )}
        </View>
        {/* Try Again Button */}
        {data.detection.length >0 && (
          <Pressable
            onPress={handleSave}
            disabled={saved || saveAnalyzeMutation.isPending}
            style={({ pressed }) => [
              styles.buttonContainer,
              !(saved || saveAnalyzeMutation.isPending) &&
                pressed && {
                  transform: [{ scale: 0.98 }],
                  opacity: 0.85,
                },
              (saved || saveAnalyzeMutation.isPending) && {
                opacity: 0.6,
              },
            ]}
          >
            <LinearGradient
              colors={
                saved || saveAnalyzeMutation.isPending
                  ? ["#A0A0A0", "#8E8E8E"]
                  : [Colors.primary, Colors.primary_2]
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>Lưu kết quả</Text>
            </LinearGradient>
          </Pressable>
        )}
        <Pressable
          onPress={handleTryAgain}
          style={({ pressed }) => [
            styles.buttonContainer,
            pressed && {
              transform: [{ scale: 0.98 }],
              opacity: 0.8,
            },
          ]}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.primary_2]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Thử lại</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ResultSection;
