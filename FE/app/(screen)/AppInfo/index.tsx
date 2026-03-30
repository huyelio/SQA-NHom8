import GradientText from "@/components/appComponents/GradientText";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InfoItem = ({
  title,
  description,
  onPress,
}: {
  title: string;
  description?: string;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={{
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(255,255,255,0.12)",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>{title}</Text>
        {onPress && <Text style={{ color: "#9CA3AF", fontSize: 18 }}>›</Text>}
      </View>

      {description && (
        <Text
          style={{
            color: "#9CA3AF",
            fontSize: 13,
            marginTop: 6,
            lineHeight: 18,
          }}
        >
          {description}
        </Text>
      )}
    </Pressable>
  );
};

export default function AppInfoScreen() {
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 40,
          }}
        >
          {/* Title */}
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={{
              fontSize: 26,
              fontWeight: "700",
              marginBottom: 24,
            }}
          >
            Thông tin ứng dụng
          </GradientText>

          {/* About */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: 16,
              padding: 16,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 15,
                lineHeight: 22,
              }}
            >
              Ứng dụng hỗ trợ phân tích tình trạng da và sức khỏe dựa trên hình
              ảnh và thông tin cá nhân, giúp người dùng hiểu rõ hơn về cơ thể và
              xây dựng thói quen sống lành mạnh.
            </Text>
          </View>

          {/* Legal & Info */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: 16,
              paddingHorizontal: 16,
            }}
          >
            <InfoItem
              title="Chính sách quyền riêng tư"
              description="Cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu người dùng."
              onPress={() => router.push("/(screen)/AppInfo/PrivacyPolicyScreen")}
            />

            <InfoItem
              title="Điều khoản sử dụng"
              description="Các điều khoản khi sử dụng ứng dụng."
              onPress={() => Linking.openURL("https://your-domain.com/terms")}
            />

            <InfoItem
              title="Liên hệ hỗ trợ"
              description="Email: support@your-domain.com"
              onPress={() => Linking.openURL("mailto:support@your-domain.com")}
            />

            <InfoItem
              title="Phiên bản ứng dụng"
              description={`Phiên bản hiện tại: ${version}`}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
