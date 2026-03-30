import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { useRef } from "react";
import { NotifyTypeEnum } from "@/constants/notify";
import { OrderForm, orderSchema } from "@/schema/orderSchema";
import { createOrder, getVnpayQr, confirmCod } from "@/services/api/medication/order";
import { Colors } from "@/styles/Common";
import { useCartStore } from "@/types/cart";
import { Mode } from "@/types/pharmacy";
import { extractOrderIdFromMessage } from "@/utils/getIDFormMSG";
import { notify } from "@/utils/notify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
type PaymentMethod = "COD" | "VNPAY";

type Props = {
  setMode: Dispatch<SetStateAction<Mode>>;
};
export default function PharmacyCartTab({ setMode }: Props) {
  const items = useCartStore((s) => s.items);
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const queryClient = useQueryClient();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      receiverName: "",
      receiverPhone: "",
      shippingAddress: "",
    },
  });

  const clearCart = useCartStore((s) => s.clearCart);
  



  const orderMutation = useMutation({
    mutationFn: (form: OrderForm) => createOrder(form),
    onError: () => {
      notify("Đặt hàng thất bại", NotifyTypeEnum.ERROR);
    },
  });

  const getQrMutation = useMutation({
    mutationFn: (id: number) => getVnpayQr(id),
    onSuccess: (res) => {
      console.log(res);
      setQrCode(res.paymentUrl);
      setShowQrModal(true);
    },
    onError: () => {
      notify("Đặt hàng thất bại", NotifyTypeEnum.ERROR);
    },
  });

  const onSubmit = (form: OrderForm) => {
  const payload = {
    ...form,
    paymentMethod,
    items: items.map((item) => ({
      drugId: item.id,
      quantity: item.quantity,
    })),
  };

  // COD
  if (paymentMethod === "COD") {
    orderMutation.mutate(payload, {
      onSuccess: async (res) => {
        const orderId = extractOrderIdFromMessage(res.data.toString());

        if (!orderId) {
          notify("Không lấy được mã đơn hàng", NotifyTypeEnum.ERROR);
          return;
        }

        try {
          await confirmCod(orderId);

          notify("Đặt hàng COD thành công", NotifyTypeEnum.SUCCESS);
          clearCart();
          setMode("orders");

        } catch (e) {
          notify("Xác nhận COD thất bại", NotifyTypeEnum.ERROR);
        }
      },
    });

    return;
  }

  // VNPAY (GIỮ NGUYÊN)
  orderMutation.mutate(payload, {
    onSuccess: (res) => {
      const orderId = extractOrderIdFromMessage(res.data.toString());

      if (!orderId) {
        notify("Không lấy được mã đơn hàng", NotifyTypeEnum.ERROR);
        return;
      }

      getQrMutation.mutate(orderId);
    },
  });
};


  const renderFooter = () => (
    <>
      {/* FORM */}
      <View
        style={{
          backgroundColor: "#111",
          marginTop: 12,
          padding: 16,
          borderRadius: 16,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 12,
          }}
        >
          Thông tin giao hàng
        </Text>

        <Text style={{ color: "#aaa", marginBottom: 6 }}>Tên người nhận</Text>
        <Controller
          control={control}
          name="receiverName"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Nguyễn Văn A"
              placeholderTextColor="#666"
              style={{
                backgroundColor: "#0D0D0D",
                borderRadius: 12,
                padding: 12,
                color: "#fff",
              }}
            />
          )}
        />
        {errors.receiverName && (
          <Text style={{ color: "#EF4444", marginTop: 4 }}>
            {errors.receiverName.message}
          </Text>
        )}

        {/* Phone */}
        <Text style={{ color: "#aaa", marginVertical: 6 }}>Số điện thoại</Text>
        <Controller
          control={control}
          name="receiverPhone"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
              placeholder="0909123456"
              placeholderTextColor="#666"
              style={{
                backgroundColor: "#0D0D0D",
                borderRadius: 12,
                padding: 12,
                color: "#fff",
              }}
            />
          )}
        />
        {errors.receiverPhone && (
          <Text style={{ color: "#EF4444", marginTop: 4 }}>
            {errors.receiverPhone.message}
          </Text>
        )}

        {/* Address */}
        <Text style={{ color: "#aaa", marginVertical: 6 }}>
          Địa chỉ giao hàng
        </Text>
        <Controller
          control={control}
          name="shippingAddress"
          render={({ field: { value, onChange } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              multiline
              placeholder="123 Nguyễn Trãi, Quận 5, TP.HCM"
              placeholderTextColor="#666"
              style={{
                backgroundColor: "#0D0D0D",
                borderRadius: 12,
                padding: 12,
                color: "#fff",
                minHeight: 80,
              }}
            />
          )}
        />
        {errors.shippingAddress && (
          <Text style={{ color: "#EF4444", marginTop: 4 }}>
            {errors.shippingAddress.message}
          </Text>
        )}
        <View
          style={{
            marginTop: 16,
            backgroundColor: "#111",
            padding: 16,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
              marginBottom: 12,
            }}
          >
            Phương thức thanh toán
          </Text>

          {/* COD */}
          <Pressable
            onPress={() => setPaymentMethod("COD")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Ionicons
              name={
                paymentMethod === "COD" ? "radio-button-on" : "radio-button-off"
              }
              size={20}
              color={Colors.primary_2}
            />
            <Text style={{ color: "#fff", marginLeft: 8 }}>
              Thanh toán khi nhận hàng (COD)
            </Text>
          </Pressable>

          {/* VNPAY */}
          <Pressable
            onPress={() => setPaymentMethod("VNPAY")}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name={
                paymentMethod === "VNPAY"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={Colors.primary_2}
            />
            <Text style={{ color: "#fff", marginLeft: 8 }}>
              Thanh toán qua VNPAY (QR)
            </Text>
          </Pressable>
        </View>
      </View>

      {/* FOOTER */}
      <View
        style={{
          marginTop: 16,
          backgroundColor: "#111",
          padding: 16,
          borderRadius: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 12,
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
            {totalPrice.toLocaleString()} ₫
          </Text>
        </View>

        <Pressable
          disabled={orderMutation.isPending}
          onPress={handleSubmit(onSubmit)}
          style={{
            backgroundColor:
              orderMutation.isPending || getQrMutation.isPending
                ? "#555"
                : Colors.primary_2,
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            {orderMutation.isPending || getQrMutation.isPending
              ? "Đang xử lý..."
              : "Đặt hàng"}
          </Text>
        </Pressable>
      </View>
    </>
  );
  const renderCartItem = ({ item }: any) => (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#111",
        borderRadius: 14,
        padding: 12,
        marginBottom: 12,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 72, height: 72 }}
        contentFit="contain"
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text
          style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        <Text
          style={{
            color: Colors.primary_2,
            marginTop: 4,
            fontWeight: "600",
          }}
        >
          {item.price.toLocaleString()} ₫
        </Text>

        {/* Quantity */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Pressable
            onPress={() =>
              updateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#222",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="remove" size={16} color="#fff" />
          </Pressable>

          <Text
            style={{
              color: "#fff",
              marginHorizontal: 12,
              fontWeight: "600",
            }}
          >
            {item.quantity}
          </Text>

          <Pressable
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#222",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="add" size={16} color="#fff" />
          </Pressable>
        </View>
      </View>

      {/* Remove */}
      <Pressable onPress={() => removeFromCart(item.id)}>
        <Ionicons name="trash-outline" size={22} color="#EF4444" />
      </Pressable>
    </View>
  );

  if (items.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Ionicons name="cart-outline" size={48} color="#666" />
        <Text style={{ color: "#888", marginTop: 12 }}>
          Giỏ hàng của bạn đang trống
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {/* LIST */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={renderCartItem}
        ListFooterComponent={renderFooter}
      />
      {/* ===== VNPAY PAYMENT MODAL ===== */}
      <Modal
        visible={showQrModal}
        animationType="slide"
        onRequestClose={() => {
          clearCart();
          setShowQrModal(false);
          setMode("orders");
        }}
      >
        <SafeAreaView
          edges={["top"]}
          style={{ flex: 1, backgroundColor: "#000" }}
        >
          <View style={{ flex: 1, backgroundColor: "#000" }}>
            {/* Header */}
            <View
              style={{
                height: 52,
                backgroundColor: "#111",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
              }}
            >
              <Pressable
                onPress={() => {
                  setShowQrModal(false);
                  clearCart();
                  setMode("orders");
                }}
              >
                <Ionicons name="close" size={24} color="#fff" />
              </Pressable>

              <Text
                style={{
                  color: "#fff",
                  fontWeight: "600",
                  marginLeft: 12,
                }}
              >
                Thanh toán VNPAY
              </Text>
            </View>

            
            {qrCode && (
             <WebView
  source={{ uri: qrCode }}
  javaScriptEnabled
  domStorageEnabled
  startInLoadingState
  onMessage={(event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.type === "VNPAY_RESULT") {
        if (data.status === "success") {
          notify("Thanh toán VNPAY thành công", NotifyTypeEnum.SUCCESS);
          clearCart();
        } else {
          notify("Thanh toán VNPAY thất bại", NotifyTypeEnum.ERROR);
        }

        setShowQrModal(false);
        setMode("orders");
        setQrCode(null);
      }
    } catch (e) {
      // ignore
    }
  }}
/>




            )}
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
