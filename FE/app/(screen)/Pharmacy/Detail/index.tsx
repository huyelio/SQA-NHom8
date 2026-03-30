import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import LoadingScreen from "@/components/appComponents/Loading";
import { NotifyTypeEnum } from "@/constants/notify";
import { getDrugById } from "@/services/api/medication/medication";
import { Colors } from "@/styles/Common";
import { useCartStore } from "@/types/cart";
import { notify } from "@/utils/notify";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable } from "react-native";

export default function DrugDetailScreen() {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((s) => s.addToCart);
  const { data, isLoading } = useQuery({
    queryKey: ["drug-detail", id],
    queryFn: () => getDrugById(Number(id)),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
      <Image
        source={{ uri: data.image }}
        style={{ width: "100%", height: 240 }}
        contentFit="contain"
      />

      <View style={{ padding: 16 }}>
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700" }}>
          {data.name}
        </Text>

        <Text
          style={{
            color: Colors.text_secondary,
            marginTop: 8,
            fontSize: 15,
          }}
        >
          {data.title}
        </Text>
        <View
          style={{
            backgroundColor: "#141414",
            borderRadius: 16,
            padding: 16,
            marginTop: 16,
          }}
        >
          {/* Giá */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: Colors.primary_2,
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              {data.price.toLocaleString()} ₫
            </Text>
            <Pressable
              onPress={() =>
                router.replace({
                  pathname: "/(tabs)/pharmacy",
                  params: { mode: "cart" },
                })
              }
            >
              <MaterialCommunityIcons
                name="cart-outline"
                size={40}
                color={Colors.primary_2}
                style={{ height: 40, width: 40, marginTop: 16 }}
              />
            </Pressable>
          </View>

          {/* Tồn kho / Đã bán */}
          <Text
            style={{
              color: Colors.text_secondary,
              marginTop: 6,
              fontSize: 13,
            }}
          >
            Tồn kho: {data.stockQuantity} · Đã bán: {data.soldQuantity}
          </Text>

          {/* Chọn số lượng */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 14,
            }}
          >
            <Text style={{ color: "#fff", marginRight: 12 }}>Số lượng</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#0D0D0D",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <Pressable
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ padding: 20 }}
              >
                <MaterialCommunityIcons name="minus" size={18} color="#fff" />
              </Pressable>

              <Text
                style={{
                  color: "#fff",
                  minWidth: 32,
                  textAlign: "center",
                }}
              >
                {quantity}
              </Text>

              <Pressable
                onPress={() => setQuantity((q) => q + 1)}
                style={{ padding: 20 }}
              >
                <MaterialCommunityIcons name="plus" size={18} color="#fff" />
              </Pressable>
            </View>
          </View>

          {/* Button Add to Cart */}
          <Pressable
            onPress={() => {
              addToCart({
                id: data.id,
                name: data.name,
                image: data.image,
                price: data.price,
                quantity,
              });
              notify("Đã thêm vào giỏ hàng", NotifyTypeEnum.SUCCESS);
            }}
            style={{
              marginTop: 16,
              backgroundColor: Colors.primary_2,
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Thêm vào giỏ hàng
            </Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: Colors.primary_2,
            fontSize: 18,
            marginTop: 12,
            fontWeight: "600",
          }}
        >
          {data.price.toLocaleString()} ₫
        </Text>

        {/* Sections */}
        {data.sections.map((section: any) => (
          <View key={section.id} style={{ marginTop: 20 }}>
            <Text
              style={{
                color: "#fff",
                fontSize: 17,
                fontWeight: "600",
                marginBottom: 6,
              }}
            >
              {section.title}
            </Text>

            <Text
              style={{
                color: Colors.text_secondary,
                lineHeight: 22,
              }}
            >
              {section.content}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
