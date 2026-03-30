import { Colors } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    rowGap: 10,
  },

  modalItem: {
    paddingTop: 20,
    paddingBottom: 19,
    paddingHorizontal: 10,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },

  modalItemSelected: {
    backgroundColor: "rgba(99,102,241,0.25)",
    borderWidth: 1,
    borderColor: "rgba(99,102,241,0.4)",
    borderBottomColor: "rgba(99,102,241,0.4)",
    borderRadius: 8,
    paddingTop: 19,
    paddingHorizontal: 9,
  },

  modalCloseButton: {
    marginTop: 32,
    padding: 12,
    borderRadius: 8,
  },
});

export default styles;
