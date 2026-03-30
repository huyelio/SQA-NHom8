import GradientText from "@/components/appComponents/GradientText";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Section = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          color: "#A5B4FC",
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 6,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "white",
          fontSize: 14,
          lineHeight: 22,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

export default function TermsOfUseScreen() {
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
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={{
              fontSize: 24,
              fontWeight: "700",
              marginBottom: 24,
            }}
          >
            Điều khoản sử dụng
          </GradientText>

          <Section
            title="1. Chấp nhận điều khoản"
            content="Khi truy cập và sử dụng ứng dụng, bạn đồng ý tuân thủ các điều khoản sử dụng được nêu dưới đây. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng ứng dụng."
          />

          <Section
            title="2. Mục đích sử dụng ứng dụng"
            content="Ứng dụng được thiết kế nhằm cung cấp thông tin tham khảo và gợi ý liên quan đến tình trạng da và sức khỏe dựa trên dữ liệu do người dùng cung cấp. Nội dung trong ứng dụng không nhằm mục đích thay thế tư vấn, chẩn đoán hoặc điều trị y khoa chuyên nghiệp."
          />

          <Section
            title="3. Giới hạn trách nhiệm y tế"
            content="Kết quả phân tích, đánh giá hoặc gợi ý được hiển thị trong ứng dụng chỉ mang tính chất tham khảo. Ứng dụng không phải là công cụ chẩn đoán bệnh và không thay thế ý kiến của bác sĩ, chuyên gia y tế hoặc cơ sở y tế có thẩm quyền. Người dùng nên tham khảo ý kiến bác sĩ hoặc chuyên gia y tế trước khi đưa ra bất kỳ quyết định nào liên quan đến sức khỏe."
          />

          <Section
            title="4. Trách nhiệm của người dùng"
            content="Người dùng chịu trách nhiệm đối với thông tin mình cung cấp và các quyết định dựa trên nội dung của ứng dụng. Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc hiểu sai thông tin trong ứng dụng."
          />

          <Section
            title="5. Giới hạn trách nhiệm của ứng dụng"
            content="Ứng dụng và các nhà phát triển không chịu trách nhiệm pháp lý đối với các tổn thất, rủi ro hoặc hậu quả phát sinh trực tiếp hoặc gián tiếp từ việc sử dụng ứng dụng, bao gồm nhưng không giới hạn ở các vấn đề liên quan đến sức khỏe."
          />

          <Section
            title="6. Thay đổi điều khoản"
            content="Chúng tôi có quyền cập nhật hoặc điều chỉnh điều khoản sử dụng theo thời gian. Những thay đổi quan trọng sẽ được thông báo trong ứng dụng. Việc tiếp tục sử dụng ứng dụng sau khi điều khoản được cập nhật đồng nghĩa với việc bạn chấp nhận các thay đổi đó."
          />

          <Section
            title="7. Thông tin liên hệ"
            content="Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào liên quan đến điều khoản sử dụng, vui lòng liên hệ qua email: support@your-domain.com"
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
