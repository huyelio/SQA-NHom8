import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts, FontSizes } from "@/styles/Common";

type Props = {
  source: any;
  title: string;
};
const SubHeader = ({ source, title }: Props) => {
  return (
    <LinearGradient
      colors={["#10B981", "#14B8A6", "#4ADE80"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Image source={source} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </LinearGradient>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    height: 65,
    borderRadius: 10,
    alignItems: "center",
  },
  titleContainer: {
    height: 65,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.large,
    color: "#fff",
  },
  icon: {
    width: 65,
    height: 65,
  },
});
