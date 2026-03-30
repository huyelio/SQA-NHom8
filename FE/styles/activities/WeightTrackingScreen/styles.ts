import { Colors } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /* ===== LAYOUT ===== */
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },

  scrollView: {
    paddingHorizontal: 20,
  },

  /* ===== TITLE ===== */
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginVertical: 16,
    width: "100%",
    textAlign: "center",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  /* ===== CHART ===== */
  chartCard: {
    backgroundColor: "#111",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  /* ===== FORM ===== */
  label: {
    color: Colors.text_secondary,
    fontSize: 13,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#0D0D0D",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: "#fff",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  error: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
  },

  /* ===== ACTIVITY SELECT ===== */
  activityRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },

  activityItem: {
    width: "48%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D0D0D",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 10,
  },

  activityItemActive: {
    borderColor: Colors.primary_2,
    shadowColor: Colors.primary_2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },

  activityText: {
    color: Colors.text_secondary,
    fontWeight: "600",
    fontSize: 13,
    textAlign: "center",
  },

  activityTextActive: {
    color: Colors.primary_2,
    fontWeight: "700",
  },

  /* ===== SAVE BUTTON ===== */
  saveButton: {
    marginTop: 8,
    marginBottom: 24,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* ===== TOGGLE (reuse nếu cần) ===== */
  toggleWrapper: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 4,
    marginBottom: 12,
  },

  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  toggleButtonActive: {
    backgroundColor: Colors.primary_2,
  },

  toggleText: {
    fontSize: 14,
    fontWeight: "600",
  },

  toggleTextActive: {
    color: "#fff",
  },

  toggleTextInactive: {
    color: Colors.text_secondary,
  },
});

export default styles;
