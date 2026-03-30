import { Colors, Fonts, Typography } from "@/styles/Common";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  /* TITLE */
  title: {
    ...Typography.title,
    textAlign: "center",
    marginBottom: 16,
  },

  filterCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary_2,
    marginBottom: 18,
  },
  filterTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.text_primary,
  },
  filterSub: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.text_secondary,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: Colors.primary_2,
  },
  filterChipText: {
    color: "#fff",
    fontFamily: Fonts.medium,
    fontSize: 14,
  },

  overviewContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  overviewValue: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: Colors.text_primary,
  },
  overviewLabel: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.text_secondary,
  },

  /* DATE HEADER */
  dateHeader: {
    marginTop: 16,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.text_secondary,
  },

  /* HISTORY ITEM (GIỐNG SCHEDULE CARD) */
  card: {
    backgroundColor: Colors.card,
    borderRadius: 5,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  drugName: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: Colors.text_primary,
  },
  subText: {
    marginTop: 4,
    fontSize: 13,
    color: Colors.text_secondary,
  },
  note: {
    marginTop: 6,
    fontSize: 12,
    fontStyle: "italic",
    color: Colors.text_secondary,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: "#fff",
  },

  /* EMPTY */
  emptyBox: {
    marginTop: 60,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text_secondary,
  },
  /* ================= MODAL ================= */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  modalTitle: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.text_primary,
    marginBottom: 12,
  },

  modalLabel: {
    fontFamily: Fonts.medium,
    fontSize: 13,
    color: Colors.text_secondary,
    marginTop: 12,
    marginBottom: 8,
  },

  /* ================= GRID (GIỐNG DAY SELECTOR) ================= */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  gridItem: {
    width: "22%",
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
  },

  gridItemActive: {
    backgroundColor: Colors.primary_2,
    borderColor: Colors.primary_2,
  },

  gridText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.text_secondary,
  },

  gridTextActive: {
    color: "#fff",
  },

  /* ================= MODAL ACTIONS ================= */
  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  btnGhost: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  btnGhostText: {
    fontFamily: Fonts.medium,
    fontSize: 14,
    color: Colors.text_primary,
  },

  btnPrimary: {
    backgroundColor: Colors.primary,
  },

  btnPrimaryText: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.background,
  },
});
