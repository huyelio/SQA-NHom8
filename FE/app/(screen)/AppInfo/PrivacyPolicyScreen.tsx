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

export default function PrivacyPolicyScreen() {
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
            Chính sách quyền riêng tư
          </GradientText>

          <Section
            title="1. Giới thiệu"
            content="Chính sách quyền riêng tư này mô tả cách ứng dụng thu thập, sử dụng và bảo vệ thông tin cá nhân của người dùng. Khi sử dụng ứng dụng, bạn đồng ý với các nội dung được nêu trong chính sách này."
          />

          <Section
            title="2. Dữ liệu chúng tôi thu thập"
            content="Chúng tôi có thể thu thập một số thông tin như: email đăng ký, giới tính, chiều cao, cân nặng, ngày sinh và hình ảnh do người dùng tải lên để phục vụ chức năng phân tích. Ứng dụng không thu thập thông tin nhạy cảm ngoài phạm vi cần thiết."
          />

          <Section
            title="3. Mục đích sử dụng dữ liệu"
            content="Thông tin người dùng được sử dụng nhằm cung cấp và cải thiện chức năng ứng dụng, cá nhân hóa trải nghiệm, hiển thị kết quả phân tích phù hợp và hỗ trợ người dùng khi cần thiết."
          />

          <Section
            title="4. Lưu trữ và bảo mật"
            content="Dữ liệu người dùng được lưu trữ an toàn trên hệ thống máy chủ. Chúng tôi áp dụng các biện pháp kỹ thuật phù hợp để bảo vệ dữ liệu khỏi truy cập trái phép, mất mát hoặc rò rỉ."
          />

          <Section
            title="5. Chia sẻ dữ liệu"
            content="Chúng tôi không chia sẻ thông tin cá nhân của người dùng cho bên thứ ba, trừ khi có sự đồng ý của người dùng hoặc theo yêu cầu của cơ quan có thẩm quyền theo quy định pháp luật."
          />

          <Section
            title="6. Quyền của người dùng"
            content="Người dùng có quyền xem, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân của mình. Bạn cũng có thể ngừng sử dụng ứng dụng bất kỳ lúc nào."
          />

          <Section
            title="7. Thay đổi chính sách"
            content="Chính sách quyền riêng tư có thể được cập nhật theo thời gian. Khi có thay đổi quan trọng, chúng tôi sẽ thông báo trong ứng dụng để người dùng được biết."
          />

          <Section
            title="8. Thông tin liên hệ"
            content="Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào liên quan đến chính sách quyền riêng tư, vui lòng liên hệ qua email: support@your-domain.com"
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
