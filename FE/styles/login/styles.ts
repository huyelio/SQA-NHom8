import { Colors, Fonts, FontSizes } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /* Header */
  headerContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  appTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.extraLarge,
    color: Colors.primary,
  },
  signature: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: "#6B6B6B",
    marginTop: 4,
  },
  leafIcon: {
    width: 48,
    height: 48,
  },

  /* Form container */
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  passwordContainer: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 14,
  },

  /* Skip */
  skipContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 24,
    marginBottom: 40,
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
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    marginTop: 8,
  },
  primaryText: {
    color: "black",
    fontSize: 18,
    fontFamily: Fonts.medium,
  },
  linkText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: Colors.primary,
    marginTop: 10,
    textAlign: "center",
  },
  googleButton: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 30,
    paddingVertical: 10,
    backgroundColor: "#fff",
    gap: 10,
  },
  googleText: {
    color: "#000",
    fontSize: 16,
    fontFamily: Fonts.medium,
  },
  btnDisable: {
    backgroundColor: Colors.text_primary,
  },
  textDisable: {
    color: Colors.text_secondary,
  }
});

export default styles;
