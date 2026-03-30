import { Colors } from "@/styles/Common";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <Pressable onPress={openDrawer} style={styles.button}>
        <Ionicons name="menu" size={28} color={Colors.primary} />
      </Pressable>

      <Text style={styles.headerTitle}>Health Care</Text>

      <Pressable style={styles.button}>
        <Ionicons
          name="person-circle-outline"
          size={28}
          color={Colors.primary}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },
  button: {
    padding: 8,
  },
});

export default Header;
