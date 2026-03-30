import { Colors } from "@/styles/Common";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  imageUri?: string;
  setImageUri: Dispatch<SetStateAction<string | undefined>>;
  style?: any;
  previewStyle?: any;
};

export default function ImagePickerBox({
  imageUri,
  setImageUri,
  style,
  previewStyle,
}: Props) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [imageRatio, setImageRatio] = useState<number | null>(null);

  const openPicker = () => {
    const options = ["Chụp ảnh", "Chọn từ thư viện", "Hủy"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      async (buttonIndex) => {
        let result;

        if (buttonIndex === 0) {
          result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
          });
        }

        if (buttonIndex === 1) {
          result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
          });
        }

        if (result && !result.canceled) {
          const asset = result.assets[0];
          setImageUri(asset.uri);
          setImageRatio(asset.width / asset.height);
        }
      }
    );
  };

  return (
    <Pressable style={style} onPress={openPicker}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[
            previewStyle,
            imageRatio ? { aspectRatio: imageRatio } : {},
          ]}
        />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Feather
            name="upload-cloud"
            size={56}
            color={Colors.accent_purple}
          />
          <Text style={{ color: "white", marginTop: 8 }}>
            Nhấn để chọn hoặc chụp ảnh
          </Text>
          <Text style={{ color: "#9CA3AF", fontSize: 12 }}>
            Hỗ trợ PNG, JPG
          </Text>
        </View>
      )}
    </Pressable>
  );
}
