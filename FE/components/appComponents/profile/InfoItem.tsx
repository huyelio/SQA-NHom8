import { Pressable, StyleSheet, Text } from "react-native";

const InfoItem = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <Pressable style={styles.infoItem} onPress={onPress}>
      <Text style={styles.infoText}>{title}</Text>
      <Text style={styles.infoArrow}>›</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },

  infoText: {
    color: "white",
    fontSize: 15,
  },

  infoArrow: {
    color: "#9CA3AF",
    fontSize: 18,
  },
});
export default InfoItem;
