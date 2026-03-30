import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";

import { getListDrug } from "@/services/api/medication/medication";
import DrugGridCard from "../DrugCard";
import { router } from "expo-router";

export default function PharmacyProductTab() {
  const [keyword, setKeyword] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["drugs", keyword],
      queryFn: ({ pageParam }) => getListDrug(pageParam, keyword),
      initialPageParam: 0,
      getNextPageParam: (lastPage: any) => {
        if (!lastPage || lastPage.last) return undefined;
        return lastPage.number + 1;
      },
    });

  const drugs = data?.pages.flatMap((page: any) => page.content) ?? [];

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <TextInput
        placeholder="Tìm tên thuốc..."
        placeholderTextColor="#888"
        autoFocus
        value={keyword}
        onChangeText={setKeyword}
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: 10,
          paddingHorizontal: 14,
          paddingVertical: 12,
          color: "#fff",
          marginBottom: 10,
        }}
      />
      {/* LIST */}
      {drugs.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 80,
          }}
        >
          <MaterialCommunityIcons
            name="pill-off"
            size={56}
            color="#4B5563"
            style={{ marginBottom: 12 }}
          />

          <Text
            style={{
              color: "#9CA3AF",
              fontSize: 15,
              textAlign: "center",
            }}
          >
            Không tìm thấy thuốc phù hợp
          </Text>

          <Text
            style={{
              color: "#6B7280",
              fontSize: 13,
              marginTop: 6,
              textAlign: "center",
            }}
          >
            Thử tìm bằng từ khóa khác
          </Text>
        </View>
      ) : (
        <FlatList
          data={drugs}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={{
            paddingBottom: 160,
            flexGrow: 1,
          }}
          renderItem={({ item }) => (
            <DrugGridCard
              drug={item}
              onPress={() => {
                router.push({
                  pathname: "/(screen)/Pharmacy/Detail",
                  params: { id: item.id },
                });
              }}
            />
          )}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#888" }}>
                Không tìm thấy thuốc phù hợp
              </Text>
            </View>
          } // 👈 giữ layout khi rỗng
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.6}
        />
      )}
    </View>
  );
}
