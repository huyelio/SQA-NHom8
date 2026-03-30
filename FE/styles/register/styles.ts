import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  appTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.extraLarge,
    color: Colors.primary,
  },
  subtitle: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: "#6B6B6B",
    marginTop: 4,
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 60,
  },
  formCard: {
    width: "85%",
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 24,
    shadowColor: "#fff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 5,
    rowGap: 24,
  },
  input: {
    backgroundColor: "#262626",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: Colors.text_primary,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 14,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    marginTop: 8,
  },
  primaryText: {
    color: "black",
    fontSize: FontSizes.medium,
    fontFamily: Fonts.medium,
  },
  selectWrapper: {
    backgroundColor: "#262626",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  select: {
    marginHorizontal: -6,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: Colors.text_primary,
  },
});

export default styles;
