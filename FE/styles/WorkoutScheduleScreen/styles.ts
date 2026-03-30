import { StyleSheet } from "react-native";
import { Colors } from "@/styles/Common";

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginVertical: 16,
  },

  centerBox: {
    paddingVertical: 28,
    alignItems: "center",
  },

  mutedText: {
    color: Colors.text_secondary,
    fontSize: 14,
  },

  /* ===== EMPTY ===== */
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

  primaryBtn: { width: "100%" },
  primaryBtnBg: {
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },

  errorText: {
    marginTop: 10,
    color: Colors.accent_red,
    fontSize: 13,
    fontWeight: "700",
  },

  retryBtn: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  retryText: {
    color: Colors.text_primary,
    fontWeight: "800",
  },

  /* ===== PLAN HEADER ===== */
  planHeaderCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  planHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  planDisclaimer: {
    flex: 1,
    color: Colors.text_secondary,
    fontSize: 13,
    lineHeight: 18,
  },
  planExplain: {
    marginTop: 10,
    color: Colors.text_primary,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },

  planActions: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
  },
  smallBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  smallBtnText: {
    color: Colors.text_primary,
    fontWeight: "800",
  },
  smallBtnPrimary: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "rgba(99,102,241,0.20)",
    borderWidth: 1,
    borderColor: "rgba(6,182,212,0.35)",
  },
  smallBtnPrimaryText: {
    color: Colors.primary_2,
    fontWeight: "900",
  },

  /* ===== DAY CARD ===== */
  dayCard: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dayTitle: {
    color: Colors.text_primary,
    fontSize: 16,
    fontWeight: "900",
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: "900",
  },

  restText: {
    marginTop: 10,
    color: Colors.text_secondary,
    fontSize: 13,
    lineHeight: 18,
    fontStyle: "italic",
  },

  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  exerciseName: {
    color: Colors.text_primary,
    fontSize: 14,
    fontWeight: "800",
  },
  exerciseMeta: {
    marginTop: 4,
    color: Colors.text_secondary,
    fontSize: 12,
    fontWeight: "600",
  },
});

export default styles;
