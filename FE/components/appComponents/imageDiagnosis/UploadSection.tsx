import { analyzeSkin } from "@/services/api/AI/checkFace";
import { Colors } from "@/styles/Common";
import styles from "@/styles/imageDiagnosis/uploadStyles";
import { notify } from "@/utils/notify";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
// import { setVisibilityAsync } from "expo-navigation-bar";
import { NotifyTypeEnum } from "@/constants/notify";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Pressable, Text, View } from "react-native";
import GradientText from "../GradientText";
import ImagePickerBox from "../ImagePickerBox";
import LoadingScreen from "../Loading";

type Props = {
  selectedImage: string | undefined;
  setSelectedImage: Dispatch<SetStateAction<string | undefined>>;
  setData: Dispatch<SetStateAction<any>>;
};
const UploadSection: React.FC<Props> = ({
  selectedImage,
  setSelectedImage,
  setData,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  // handel upload box size
  const [imageRatio, setImageRatio] = useState<number | null>(null);

  const openImagePickerMenu = () => {
    const options = ["Chụp ảnh", "Chọn từ thư viện", "Hủy"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // CHỤP ẢNH
          let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });
          // setTimeout(() => {
          //   setVisibilityAsync("hidden");
          // }, 100);
          if (!result.canceled) {
            const asset = result.assets[0];
            setSelectedImage(asset.uri);
            setImageRatio(asset.width / asset.height);
          }
        }

        if (buttonIndex === 1) {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
          });
          // setTimeout(() => {
          //   setVisibilityAsync("hidden");
          // }, 100);
          if (!result.canceled) {
            const asset = result.assets[0];
            setSelectedImage(asset.uri);
            setImageRatio(asset.width / asset.height);
          }
        }
      }
    );
  };

  const uploadImage = useMutation({
    mutationFn: (imgUri: string) => analyzeSkin(imgUri),
    onSuccess: (response: any) => {
      notify(
        response?.message || "Phân tích thành công",
        NotifyTypeEnum.SUCCESS
      );
      console.log(response.data);
      setData(response.data);
    },
    onError: (error: any) => {
      notify(error.message || "Lỗi kết nối máy chủ", NotifyTypeEnum.ERROR);
    },
  });

  const onSubmit = () => {
    if (!selectedImage) return;
    uploadImage.mutate(selectedImage);
  };

  if (uploadImage.isPending) {
    return <LoadingScreen message="Đang phân tích hình ảnh..." />;
  }

  return (
    <View style={styles.content}>
      <GradientText
        colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
        style={styles.title}
      >
        Chẩn đoán hình ảnh
      </GradientText>
      <Text style={styles.subtitle}>Tải lên hình ảnh khuân mặt của bạn</Text>

      {/* Hộp tải ảnh lên */}
      <ImagePickerBox
        imageUri={selectedImage}
        setImageUri={setSelectedImage}
        style={styles.uploadBox}
        previewStyle={styles.previewImage}
      />
      <Pressable
        style={({ pressed }) => [
          styles.buttonContainer,
          (!selectedImage || uploadImage.isPending) && styles.buttonDisabled,
          pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
        ]}
        onPress={onSubmit}
        disabled={!selectedImage || uploadImage.isPending}
      >
        <LinearGradient
          colors={
            !selectedImage || uploadImage.isPending
              ? ["#373737", "#2A2A2A"]
              : [Colors.primary, Colors.primary_2]
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        >
          <Text
            style={[
              styles.buttonText,
              (!selectedImage || uploadImage.isPending) &&
                styles.buttonTextDisabled,
            ]}
          >
            Chẩn đoán
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default UploadSection;
