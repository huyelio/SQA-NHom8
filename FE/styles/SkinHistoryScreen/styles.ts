import { StyleSheet } from "react-native";
import { Colors } from "@/styles/Common";

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },

  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginVertical: 10,
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  listEmpty: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexGrow: 1,
  },

  /* ===== STATES ===== */
  centerBox: {
    paddingVertical: 28,
    alignItems: "center",
  },
  mutedText: { color: Colors.text_secondary, fontSize: 14 },

  retryBtn: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  retryText: { color: Colors.text_primary, fontWeight: "800" },

  emptyWrapper: {
    marginTop: 40,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  emptyIconWrap: {
    width: 74,
    height: 74,
    borderRadius: 74,
    backgroundColor: "rgba(6,182,212,0.12)",
    borderWidth: 1,
    borderColor: "rgba(6,182,212,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  emptyTitle: {
    color: Colors.text_primary,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },
  emptyDesc: {
    color: Colors.text_secondary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 18,
    lineHeight: 20,
  },

  /* ===== ITEM CARD ===== */
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
  },
  thumb: {
    width: 68,
    height: 68,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.06)",
  },

  rowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  diagnosis: {
    flex: 1,
    color: Colors.text_primary,
    fontSize: 15,
    fontWeight: "900",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "900",
  },

  timeText: {
    marginTop: 6,
    color: Colors.text_secondary,
    fontSize: 12,
    fontWeight: "600",
  },
  noteText: {
    marginTop: 6,
    color: Colors.text_secondary,
    fontSize: 12,
    lineHeight: 16,
  },

  suggestionPreview: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },
  previewText: {
    flex: 1,
    color: Colors.text_secondary,
    fontSize: 12,
    fontWeight: "700",
  },

  /* ===== MODAL ===== */
  modalHeader: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  modalBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  modalTitle: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
  },
  hero: {
    width: "100%",
    height: 220,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  modalCard: {
    marginTop: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 18,
    padding: 14,
  },

  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  modalLabel: {
    color: Colors.text_secondary,
    fontSize: 13,
    fontWeight: "700",
  },
  modalValue: {
    color: Colors.text_primary,
    fontSize: 13,
    fontWeight: "900",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginVertical: 10,
  },

  sectionTitle: {
    color: Colors.text_primary,
    fontSize: 14,
    fontWeight: "900",
    marginBottom: 8,
  },
  paragraph: {
    color: Colors.text_secondary,
    fontSize: 13,
    lineHeight: 18,
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    marginTop: 6,
    backgroundColor: Colors.primary_2,
  },
  bulletText: {
    flex: 1,
    color: Colors.text_secondary,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },
});

export default styles;
