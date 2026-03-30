import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  theme?: "primary";
  onPress?: () => void;
  disabled?: boolean;
};

const Button = ({ label, theme, onPress, disabled = false }: Props) => {
  return theme ? (
    <LinearGradient
      colors={["#fae900CC", "#14B8A6CC", "#4ADE80CC"]}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.btnContainer}
    >
      <Pressable
        style={[
          styles.btn,
          {
            backgroundColor: disabled ? "#e0e0e0" : Colors.primary,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.btnLabel, { color: "#FFF" }]}>{label}</Text>
      </Pressable>
    </LinearGradient>
  ) : (
    <View style={styles.btnContainer}>
      <Pressable
        style={[
          styles.btn,
          {
            backgroundColor: disabled ? "#e0e0e0" : Colors.primary,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.btnLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 130,
    height: 44,
    marginHorizontal: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  btn: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnLabel: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
    color: Colors.background,
    lineHeight: 44,
  },
});

export default Button;
