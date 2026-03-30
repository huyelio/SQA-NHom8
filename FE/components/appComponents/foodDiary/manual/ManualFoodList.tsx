import { Alert, Text, View } from "react-native";
import dayjs from "dayjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingScreen from "@/components/appComponents/Loading";
import PrimaryButton from "@/components/appComponents/PrimaryButton";
import { NotifyTypeEnum } from "@/constants/notify";
import { notify } from "@/utils/notify";
import {
  getFoodInByDate,
  deleteFoodRecord,
  postAddFood,
} from "@/services/api/food/addFood";
import { useState } from "react";
import AddManualFoodModal from "./AddManualFoodModal";
import FoodItemCard from "./FoodItemCard";

export default function ManualFoodList() {
  const today = dayjs().format("YYYY-MM-DD");
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["food-records", today],
    queryFn: () => getFoodInByDate(today),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFoodRecord,
    onSuccess: () => {
      notify("Đã xóa món ăn", NotifyTypeEnum.SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ["food-records"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["target"],
        exact: false,
      });
    },
  });

  const deleteRecord = (id: number) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa món ăn này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            deleteMutation.mutate(id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const addMutation = useMutation({
    mutationFn: postAddFood,
    onSuccess: () => {
      notify("Đã thêm món ăn", NotifyTypeEnum.SUCCESS);
      queryClient.invalidateQueries({
        queryKey: ["food-records"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["target"],
        exact: false,
      });
      setShowModal(false);
    },
  });

  if (isLoading || deleteMutation.isPending) return <LoadingScreen />;

  return (
    <View>
      <View
        style={{
          backgroundColor: "rgba(139,92,246,0.15)",
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <Text
          style={{
            color: "#9CA3AF",
            fontSize: 13,
            marginBottom: 6,
          }}
        >
          Tổng năng lượng đã nạp hôm nay
        </Text>

        <Text
          style={{
            color: "#FBBF24",
            fontSize: 28,
            fontWeight: "800",
          }}
        >
          {data?.summary?.total_calorie_in ?? 0} kcal
        </Text>
      </View>

      {data?.foods?.map((item: any) => (
        <FoodItemCard
          key={item.id}
          item={item}
          onDelete={() => deleteRecord(item.id)}
        />
      ))}

      <PrimaryButton text="Thêm thủ công" onPress={() => setShowModal(true)} />

      <AddManualFoodModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(food) => {
          addMutation.mutate({
            log_date: today,
            foods: [{ ...food, input_method: "manual" }],
          });
        }}
        isLoading={addMutation.isPending}
      />
    </View>
  );
}
