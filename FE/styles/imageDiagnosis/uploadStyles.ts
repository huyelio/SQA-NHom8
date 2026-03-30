import { Colors } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: Colors.text_secondary,
    textAlign: "center",
    marginBottom: 30,
    marginTop: 8,
  },

  // Upload Box
  uploadBox: {
    minHeight: 350,
    width: "100%",
    borderWidth: 4,
    borderColor: Colors.border,
    borderStyle: "dashed",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.card,
    overflow: "hidden",
    marginBottom: 30,
    maxHeight: "65%",
  },
  uploadPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    marginTop: 15,
    fontSize: 18,
    color: Colors.text_secondary,
    fontWeight: "500",
  },

  uploadSubtext: {
    fontSize: 14,
    color: Colors.text_secondary,
    marginTop: 5,
  },

  previewImage: {
    width: "100%",
    resizeMode: "contain",
  },

  // Button
  buttonContainer: {
    width: "80%",
    height: 55,
    borderRadius: 15,
    overflow: "hidden",
    // shadowColor: Colors.glow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 20,
  },

  buttonDisabled: {
    shadowColor: "transparent",
    elevation: 0,
  },

  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text_primary,
  },

  buttonTextDisabled: {
    color: Colors.text_secondary,
  },
});

export default styles;
