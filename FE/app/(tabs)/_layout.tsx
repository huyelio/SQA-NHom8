import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import { Image } from "expo-image";
import { Colors } from "@/styles/Common";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const iconChandoan = require("@/assets/image/chandoan.png");

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 20,
        },
      }}
    >
      <Tabs.Screen
        name="activites"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="walk-outline"
              size={40}
              color={focused ? Colors.primary_2 : Colors.text_secondary}
              style={{ height: 40, width: 40, marginTop: 16 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={iconChandoan}
              style={{
                marginTop: 20,
                width: 60,
                height: 60,
                tintColor: focused ? "#0ea5e9" : "#94a3b8",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pharmacy"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="cart-outline"
              size={40}
              color={focused ? Colors.primary_2 : Colors.text_secondary}
              style={{ height: 40, width: 40, marginTop: 16 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="medicationReminder"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="pill"
              size={40}
              color={focused ? Colors.primary_2 : Colors.text_secondary}
              style={{ height: 40, width: 40, marginTop: 16 }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle-outline"
              size={40}
              color={focused ? Colors.primary_2 : Colors.text_secondary}
              style={{ height: 40, width: 40, marginTop: 16 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
