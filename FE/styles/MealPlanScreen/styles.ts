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

  retryBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },
  retryText: {
    color: Colors.text_primary,
    fontWeight: "800",
    fontSize: 13,
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
  planDisclaimer: {
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

  smallBtnPrimary: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "rgba(99,102,241,0.18)",
    borderWidth: 1,
    borderColor: "rgba(6,182,212,0.35)",
  },
  smallBtnPrimaryText: {
    color: Colors.primary_2,
    fontWeight: "900",
    fontSize: 13,
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
  dayTitle: {
    color: Colors.text_primary,
    fontSize: 16,
    fontWeight: "900",
  },

  /* ===== MEAL CARD ===== */
  mealCard: {
    marginTop: 12,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  mealHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  mealLabel: {
    color: Colors.text_primary,
    fontWeight: "800",
  },
  calories: {
    color: Colors.primary_2,
    fontWeight: "700",
  },
  mealDesc: {
    marginTop: 4,
    color: Colors.text_secondary,
    fontSize: 13,
  },

  macroRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 6,
  },
  macroText: {
    color: Colors.text_secondary,
    fontSize: 12,
    fontWeight: "600",
  },

  ingredientList: {
    marginTop: 6,
  },
  ingredientText: {
    color: Colors.text_secondary,
    fontSize: 12,
    marginTop: 2,
  },
});

export default styles;
