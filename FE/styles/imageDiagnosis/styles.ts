import { Colors } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
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
  // --- Upload Styles ---
  uploadBox: {
    flex: 2 / 4,
    width: "100%",
    minHeight: 250,
    borderWidth: 4,
    borderColor: Colors.border,
    borderStyle: "dashed",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.card,
    overflow: "hidden",
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
    aspectRatio: 1, // tạm thời — lát nữa mình thay bằng real aspectRatio
    resizeMode: "contain",
  },
  // --- Result Styles (Mới) ---
  resultBox: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 15,
  },
  resultItem: {
    marginBottom: 20,
  },
  resultItemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary_2, // Dùng màu cyan cho tiêu đề
    marginBottom: 8,
  },
  resultItemDetail: {
    fontSize: 15,
    color: Colors.text_secondary,
    lineHeight: 22,
  },
  recommendationBox: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  recommendationText: {
    fontSize: 15,
    color: Colors.text_primary,
    fontStyle: "italic",
    lineHeight: 22,
  },
  // --- Button Styles ---
  buttonContainer: {
    width: "80%",
    height: 55,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: Colors.accent_blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 56
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
