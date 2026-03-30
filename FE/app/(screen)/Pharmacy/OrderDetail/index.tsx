import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GradientText from "@/components/appComponents/GradientText";
import LoadingScreen from "@/components/appComponents/Loading";
import { NotifyTypeEnum } from "@/constants/notify";
import { cancelOrder, getOrderDetail } from "@/services/api/medication/order";
import { Colors } from "@/styles/Common";
import { notify } from "@/utils/notify";
import { LinearGradient } from "expo-linear-gradient";
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_DISPLAY,
} from "@/constants/pharmacy";

export default function PharmacyOrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const orderId = Number(id);
  const queryClient = useQueryClient();

  /* ================= QUERY ================= */
  const { data: order, isLoading } = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId,
  });

  /* ================= MUTATION ================= */
  const cancelMutation = useMutation({
    mutationFn: () => cancelOrder(orderId),
    onSuccess: () => {
      notify("Đã hủy đơn hàng", NotifyTypeEnum.SUCCESS);

      queryClient.invalidateQueries({
        queryKey: ["orders"],
        exact: false,
      });

      router.back();
    },
    onError: () => {
      notify("Không thể hủy đơn", NotifyTypeEnum.ERROR);
    },
  });

  if (isLoading || !order) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0D0D0D" }}>
        <LoadingScreen />
      </SafeAreaView>
    );
  }

  const isPending = order.status === "PENDING" || order.status === "PAID";

  const statusColor = ORDER_STATUS_COLORS[order.status] || "#EF4444";

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* ===== ORDER INFO ===== */}
          <GradientText
            colors={["#8B5CF6", "#6366F1", "#06B6D4"]}
            style={{
              fontSize: 28,
              fontWeight: "700",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Chi tiết đơn hàng
          </GradientText>
          <View
            style={{
              backgroundColor: "#111",
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>
                Đơn #{order.orderId}
              </Text>
              <Text style={{ color: statusColor }}>
                {ORDER_STATUS_DISPLAY[order.status]}
              </Text>
            </View>

            <View style={{ marginTop: 8 }}>
              <View style={{ marginBottom: 6 }}>
                <Text
                  style={{
                    color: "#888",
                    fontSize: 12,
                    marginBottom: 2,
                  }}
                >
                  Người nhận
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {order.receiverName}
                </Text>
              </View>

              <View style={{ marginBottom: 6 }}>
                <Text
                  style={{
                    color: "#888",
                    fontSize: 12,
                    marginBottom: 2,
                  }}
                >
                  Số điện thoại
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {order.receiverPhone}
                </Text>
              </View>

              <View>
                <Text
                  style={{
                    color: "#888",
                    fontSize: 12,
                    marginBottom: 2,
                  }}
                >
                  Địa chỉ giao hàng
                </Text>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: "500",
                    lineHeight: 20,
                  }}
                >
                  {order.shippingAddress}
                </Text>
              </View>
            </View>
          </View>

          {/* ===== ITEMS (STYLE GIỐNG CART ITEM) ===== */}
          {order.items.map((item: any) => (
            <View
              key={item.drugId}
              style={{
                flexDirection: "row",
                backgroundColor: "#111",
                borderRadius: 14,
                padding: 12,
                marginBottom: 12,
              }}
            >
              <Image
                source={{ uri: item.imgUrl }}
                style={{ width: 72, height: 72 }}
                contentFit="contain"
              />

              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: "600",
                  }}
                  numberOfLines={2}
                >
                  {item.drugName}
                </Text>

                <Text
                  style={{
                    color: Colors.primary_2,
                    marginTop: 4,
                    fontWeight: "600",
                  }}
                >
                  {item.unitPrice.toLocaleString()} ₫
                </Text>

                <Text
                  style={{
                    color: "#aaa",
                    marginTop: 8,
                    fontSize: 13,
                  }}
                >
                  Số lượng: {item.quantity}
                </Text>

                <Text
                  style={{
                    color: "#fff",
                    marginTop: 4,
                    fontWeight: "600",
                  }}
                >
                  Thành tiền: {item.totalPrice.toLocaleString()} ₫
                </Text>
              </View>
            </View>
          ))}

          {/* ===== TOTAL ===== */}
          <View
            style={{
              backgroundColor: "#111",
              borderRadius: 16,
              padding: 16,
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#aaa" }}>Tổng tiền</Text>
            <Text
              style={{
                color: Colors.primary_2,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {order.totalAmount.toLocaleString()} ₫
            </Text>
          </View>

          {/* ===== CANCEL ===== */}
          {isPending && (
            <Pressable
              onPress={() =>
                Alert.alert(
                  "Xác nhận hủy đơn",
                  "Bạn có chắc muốn hủy đơn hàng này?",
                  [
                    { text: "Không", style: "cancel" },
                    {
                      text: "Hủy đơn",
                      style: "destructive",
                      onPress: () => cancelMutation.mutate(),
                    },
                  ]
                )
              }
              style={{
                marginTop: 20,
                paddingVertical: 12,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#EF4444",
                alignItems: "center",
                opacity: cancelMutation.isPending ? 0.6 : 1,
              }}
            >
              <Text style={{ color: "#EF4444", fontWeight: "600" }}>
                {cancelMutation.isPending ? "Đang hủy..." : "Hủy đơn hàng"}
              </Text>
            </Pressable>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
