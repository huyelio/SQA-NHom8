import { Colors, Fonts, FontSizes, Typography } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    padding: 10,
  },

  scrollView: {
    flex: 1,
  },

  title: {
    fontSize: FontSizes.large,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 26,
    textAlign: "center",
  },

  inputContainer: {
    marginBottom: 24,
  },

  input: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    ...Typography.bodyMedium,
  },

  label: {
    ...Typography.label,
    marginBottom: 6,
  },

  requiredMark: {
    color: "#FF4D4F",
    fontSize: FontSizes.small,
    fontFamily: Fonts.regular,
  },

  textPicker: {
    ...Typography.bodyMedium,
    color: Colors.text_primary,
  },

  errorText: {
    marginTop: 4,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.small,
    color: Colors.accent_red,
  },

  /* Select Box */
  selectBox: {
    height: 50,
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    fontFamily: Fonts.regular,
    fontSize: FontSizes.medium,
    color: Colors.text_primary,
  },

  /* Modal overlay */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* Modal container */
  modalBox: {
    width: "88%",
    backgroundColor: "#1C1C2E",
    borderRadius: 20,
    padding: 20,
    maxHeight: "70%",
  },

  modalItem: {
    paddingVertical: 12,
    borderBottomColor: "#2E2E3A",
    borderBottomWidth: 1,
  },

  modalItemLabel: {
    ...Typography.bodyMedium,
  },

  modalItemSubLabel: {
    ...Typography.body,
    color: Colors.text_secondary,
    marginTop: 2,
  },

  modalCloseButton: {
    marginTop: 16,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card,
  },

  modalCloseText: {
    color: Colors.text_primary,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
  },

  /* Secondary button */
  addTimeCard: {
    marginTop: 12,
    height: 50,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: Colors.primary_2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "rgba(6,182,212,0.08)", // primary_2 overlay
  },

  addTimeCardText: {
    color: Colors.primary_2,
    fontFamily: Fonts.medium,
    fontSize: FontSizes.medium,
  },

  /* Save button */
  saveButton: {
    paddingVertical: 15,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonContainer: {
    marginVertical: 30,
  },

  saveText: {
    ...Typography.bodyMedium,
    color: "#FFF",
    textAlign: "center",
  },
});

export default styles;
