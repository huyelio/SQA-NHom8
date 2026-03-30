import { sendChat } from "@/services/api/AI/chatbot";
import { Colors } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export function renderBoldText(text: string) {
  const parts = text.split("**");

  return (
    <Text style={{ color: Colors.text_primary, lineHeight: 20 }}>
      {parts.map((part, index) => (
        <Text
          key={index}
          style={
            index % 2 === 1
              ? { fontWeight: "700", color: Colors.text_primary }
              : {}
          }
        >
          {part}
        </Text>
      ))}
    </Text>
  );
}
type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

export default function AIHealthAdvisor() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      text: "Xin chào 👋 Tôi có thể giúp bạn về dinh dưỡng, vận động và sức khỏe.",
    },
  ]);

  const chatMutation = useMutation({
    mutationFn: sendChat,
    onSuccess: (data) => {
      let text = "";

      try {
        // message đang là JSON string
        const parsed = JSON.parse(data.message);

        // nếu đúng format { response: "..." }
        text = parsed.response ?? data.message;
      } catch (e) {
        // fallback nếu BE đổi format
        text = data.message;
      }
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          text: text,
        },
      ]);
    },
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      text: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    chatMutation.mutate(userMessage.text);
  };

  const renderItem = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === "user";

    return (
      <View
        style={{
          alignSelf: isUser ? "flex-end" : "flex-start",
          backgroundColor: isUser ? Colors.primary : "#1E1E2E",
          padding: 12,
          borderRadius: 14,
          marginVertical: 6,
          maxWidth: "80%",
        }}
      >
        {renderBoldText(item.text)}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* HEADER */}
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#222",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: Colors.text_primary,
              }}
            >
              Trợ lý sức khỏe Tuệ Tĩnh
            </Text>
          </View>

          {/* CHAT LIST */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 16 }}
          />

          {/* INPUT */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              borderTopWidth: 1,
              borderTopColor: "#222",
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Hỏi AI về dinh dưỡng, vận động..."
              placeholderTextColor={Colors.text_secondary}
              style={{
                flex: 1,
                color: Colors.text_primary,
                padding: 12,
                backgroundColor: "#1E1E2E",
                borderRadius: 12,
                marginRight: 8,
              }}
            />

            <Pressable onPress={handleSend} disabled={chatMutation.isPending}>
              <Ionicons
                name="send"
                size={22}
                color={
                  chatMutation.isPending
                    ? Colors.text_secondary
                    : Colors.primary
                }
              />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
