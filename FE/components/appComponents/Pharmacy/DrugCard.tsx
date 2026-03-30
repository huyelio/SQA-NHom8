import { Colors } from "@/styles/Common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

type DrugCardProps = {
  drug: {
    image: string;
    name: string;
    title: string;
    price: number;
    soldQuantity: number;
  };
  onPress: () => void;
};

export default function DrugGridCard({ drug, onPress }: DrugCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: "49%",
        backgroundColor: "#141414",
        borderRadius: 14,
        padding: 12,
        marginBottom: 16,
      }}
    >
      {/* Image */}
      <View
        style={{
          backgroundColor: "#0D0D0D",
          borderRadius: 10,
          padding: 8,
        }}
      >
        <Image
          source={{ uri: drug.image }}
          style={{ width: "100%", height: 100 }}
          contentFit="contain"
        />
      </View>

      {/* Name */}
      <Text
        numberOfLines={1}
        style={{
          color: "#fff",
          fontWeight: "600",
          marginTop: 8,
        }}
      >
        {drug.name}
      </Text>

      {/* Title */}
      <Text
        numberOfLines={2}
        style={{
          color: Colors.text_secondary,
          fontSize: 12,
          marginTop: 2,
        }}
      >
        {drug.title}
      </Text>

      {/* Price */}
      <Text
        style={{
          color: Colors.primary_2,
          fontWeight: "700",
          marginTop: 6,
        }}
      >
        {drug.price.toLocaleString()} ₫
      </Text>

      {/* Footer */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 6,
        }}
      >
        <Text style={{ color: "#888", fontSize: 11 }}>
          Đã bán {drug.soldQuantity}
        </Text>

        <MaterialCommunityIcons
          name="cart-plus"
          size={20}
          color={Colors.primary_2}
        />
      </View>
    </Pressable>
  );
}
