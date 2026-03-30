import { NotifyTypeEnum } from "@/constants/notify";
import {
  ORDER_STATUS,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_DISPLAY,
} from "@/constants/pharmacy";
import { cancelOrder, getMyOrders } from "@/services/api/medication/order";
import { Colors } from "@/styles/Common";
import { notify } from "@/utils/notify";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import LoadingScreen from "../../Loading";

export default function PharmacyOrdersTab() {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["orders", selectedStatus],
    queryFn: ({ pageParam, queryKey }) => {
      const [, status] = queryKey;

      return getMyOrders(pageParam, status === "ALL" ? undefined : status);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => {
      if (!lastPage || lastPage.last) return undefined;
      return lastPage.page + 1;
    },
  });

  const orders = data?.pages.flatMap((page) => page.content) ?? [];

  const cancelOrderMutation = useMutation({
    mutationFn: (orderId: number) => cancelOrder(orderId),
    onSuccess: () => {
      notify("Đã hủy đơn hàng", NotifyTypeEnum.SUCCESS);

      queryClient.invalidateQueries({
        queryKey: ["orders"],
        exact: false,
      });
    },
    onError: () => {
      notify("Không thể hủy đơn hàng", NotifyTypeEnum.ERROR);
    },
  });

  /* ---------- ITEM ---------- */
  const renderItem = ({ item }: any) => {
    const statusColor = ORDER_STATUS_COLORS[item.status] || "#EF4444";

    return (
      <Pressable
        onPress={() => {
          router.push({
            pathname: "/(screen)/Pharmacy/OrderDetail",
            params: {
              id: item.orderId,
            },
          });
        }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.9 : 1,
        })}
      >
        <View
          style={{
            backgroundColor: "#111",
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
          }}
        >
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Đơn #{item.orderId}
            </Text>
            <Text style={{ color: statusColor }}>
              {ORDER_STATUS_DISPLAY[item.status]}
            </Text>
          </View>

          <Text style={{ color: "#aaa", marginBottom: 6 }}>
            {dayjs(item.createdAt).format("HH:mm DD/MM/YYYY")}
          </Text>

          {/* ITEMS */}
          {item.items.map((it: any, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 2,
              }}
            >
              <Text style={{ color: "#ddd", flex: 1 }}>
                {it.drugName} × {it.quantity}
              </Text>
              <Text style={{ color: "#ddd" }}>
                {it.totalPrice.toLocaleString()} ₫
              </Text>
            </View>
          ))}

          {/* FOOTER */}
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#222",
              marginTop: 8,
              paddingTop: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#aaa" }}>Tổng tiền</Text>
            <Text
              style={{
                color: Colors.primary_2,
                fontWeight: "700",
              }}
            >
              {item.totalAmount.toLocaleString()} ₫
            </Text>
          </View>

          <Text
            style={{
              color: "#aaa",
              marginTop: 6,
              fontSize: 12,
            }}
          >
            Giao tới: {item.receiverName} – {item.receiverPhone}
          </Text>

          <Text style={{ color: "#aaa", fontSize: 12 }}>
            {item.shippingAddress}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={{ flex: 1 / 10 }}>
        <FlatList
          data={ORDER_STATUS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{
            paddingVertical: 10,
            height: 60,
          }}
          renderItem={({ item }) => {
            const isActive = selectedStatus === item.key;

            return (
              <Pressable
                onPress={() => setSelectedStatus(item.key)}
                style={{
                  paddingVertical: 11,
                  paddingHorizontal: 14,
                  borderRadius: 999,
                  backgroundColor: isActive ? Colors.primary_2 : "#222",
                  marginRight: 8,
                }}
              >
                <Text
                  style={{
                    color: isActive ? "#fff" : "#aaa",
                    fontSize: 13,
                    fontWeight: "500",
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
      <View style={{ flex: 9 / 10 }}>
        {isLoading || cancelOrderMutation.isPending || isRefetching ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingScreen />
          </View>
        ) : orders.length === 0 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#888" }}>Bạn chưa có đơn hàng nào</Text>
          </View>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.orderId.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.6}
            ListFooterComponent={
              isFetchingNextPage ? (
                <Text
                  style={{
                    color: "#888",
                    textAlign: "center",
                    paddingVertical: 12,
                  }}
                >
                  Đang tải thêm...
                </Text>
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
}
