import { Colors } from "@/styles/Common";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const LoadingScreen = ({ message = "Đang tải..." }: { message?: string }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.primary,
    fontFamily: "Roboto-Condensed-Medium",
  },
});

export default LoadingScreen;
