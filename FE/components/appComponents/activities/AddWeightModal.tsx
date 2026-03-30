import { Colors, Fonts, FontSizes } from "@/styles/Common";
import dayjs from "dayjs";
import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { weight: number; time: string }) => void;
};

const AddWeightModal = ({ visible, onClose, onSubmit }: Props) => {
  const [weight, setWeight] = useState("");
  const [time, setTime] = useState(dayjs());

  const handleSubmit = () => {
    if (!weight) return;
    onSubmit({
      weight: Number(weight),
      time: time.toISOString(),
    });
    setWeight("");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.card,
            borderRadius: 20,
            padding: 20,
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: FontSizes.large,
              color: Colors.text_primary,
              marginBottom: 16,
            }}
          >
            Thêm cân nặng
          </Text>

          {/* Weight input */}
          <Text
            style={{
              fontFamily: Fonts.regular,
              color: Colors.text_secondary,
              marginBottom: 6,
            }}
          >
            Cân nặng (kg)
          </Text>
          <TextInput
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            placeholder="Ví dụ: 62.5"
            placeholderTextColor="#8E8E8E"
            style={{
              backgroundColor: "#262626",
              borderRadius: 12,
              height: 50,
              paddingHorizontal: 16,
              color: Colors.text_primary,
              fontFamily: Fonts.regular,
              marginBottom: 16,
            }}
          />

          {/* Time (readonly – default now) */}
          <Text
            style={{
              fontFamily: Fonts.regular,
              color: Colors.text_secondary,
              marginBottom: 6,
            }}
          >
            Thời gian ghi nhận
          </Text>
          <View
            style={{
              backgroundColor: "#262626",
              borderRadius: 12,
              height: 50,
              justifyContent: "center",
              paddingHorizontal: 16,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: Colors.text_primary,
                fontFamily: Fonts.regular,
              }}
            >
              {time.format("HH:mm - DD/MM/YYYY")}
            </Text>
          </View>

          {/* Actions */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={onClose}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 24,
                borderWidth: 1,
                borderColor: Colors.text_secondary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: Colors.text_secondary }}>Hủy</Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit}
              style={{
                flex: 1,
                height: 48,
                borderRadius: 24,
                backgroundColor: Colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.background,
                  fontFamily: Fonts.medium,
                }}
              >
                Lưu
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddWeightModal;
