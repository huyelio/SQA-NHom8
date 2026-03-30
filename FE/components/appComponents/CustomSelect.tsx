import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  fetchData: (
    page: number,
    keyword: string
  ) => Promise<{ items: any[]; hasMore: boolean }>;
  labelKey: string;
  valueKey: string;
  error?: boolean;
};

export default function CustomSelect({
  value,
  onChange,
  placeholder,
  fetchData,
  labelKey = "label",
  valueKey = "value",
  error,
}: Props) {
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadData(page, keyword);
  }, [keyword]);

  const loadData = async (pageNumber: number, kw: string) => {
    if (loading) return;

    setLoading(true);
    const res = await fetchData(pageNumber, kw);

    if (pageNumber === 1) {
      setData(res.items);
    } else {
      setData((prev) => [...prev, ...res.items]);
    }

    setHasMore(res.hasMore);
    setLoading(false);
  };

  const loadMore = () => {
    if (!hasMore || loading) return;
    const nextPage = page + 1;
    setPage(nextPage);
    loadData(nextPage, keyword);
  };

  const selectedItem = data.find((item) => item[valueKey] === value);

  return (
    <View style={{ marginBottom: 8 }}>
      {/* Select trigger */}
      <TouchableOpacity
        onPress={() => {
          setOpen(true);
          setPage(1);
          loadData(1, keyword);
        }}
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: error ? "red" : "#ccc",
          borderRadius: 6,
        }}
      >
        <Text>{selectedItem ? selectedItem[labelKey] : placeholder}</Text>
      </TouchableOpacity>

      {/* Modal select dropdown */}
      <Modal visible={open} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              margin: 20,
              padding: 14,
              borderRadius: 8,
              maxHeight: "70%",
            }}
          >
            {/* Search bar */}
            <TextInput
              placeholder="検索..."
              value={keyword}
              onChangeText={(t) => {
                setKeyword(t);
                setPage(1);
              }}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 6,
                padding: 8,
                marginBottom: 10,
              }}
            />

            {/* Options */}
            <FlatList
              data={data}
              keyExtractor={(item) => item[valueKey].toString()}
              onEndReached={() => loadMore()}
              onEndReachedThreshold={0.2}
              ListFooterComponent={
                loading ? (
                  <ActivityIndicator style={{ marginVertical: 10 }} />
                ) : null
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item[valueKey]);
                    setOpen(false);
                  }}
                  style={{ paddingVertical: 12 }}
                >
                  <Text>{item[labelKey]}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Close */}
            <TouchableOpacity
              onPress={() => setOpen(false)}
              style={{ marginTop: 10, alignSelf: "flex-end" }}
            >
              <Text style={{ color: "blue" }}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
