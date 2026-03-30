// healthStyles.ts
import { Colors } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  circleTopRight: {
    position: "absolute",
    top: -40,
    right: -60,
    width: 320,
    height: 320,
    borderRadius: 320,
    backgroundColor: "#8B5CF6",
    opacity: 0.18,
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -100,
    left: -80,
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: "#06B6D4",
    opacity: 0.08,
  },
  progressContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  progressTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    width: "100%",
  },

  progressNumber: {
    color: "#BBBBBB",
    fontSize: 13,
  },

  progressBarBackground: {
    width: "100%",
    height: 12,
    borderRadius: 10,
    backgroundColor: Colors.card,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#8B5CF6",
  },

  progressCurrent: {
    marginTop: 6,
    color: "#AAA",
    fontSize: 13,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "left",
    width: "100%",
  },

  subtitle: {
    fontSize: 16,
    color: Colors.text_secondary,
    marginBottom: 30,
    marginTop: 8,
    width: "100%",
    textAlign: "left",
  },

  // --- Bar Chart ---
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 28,
    minHeight: 200,
  },

  barItem: {
    alignItems: "center",
  },

  bar: {
    width: 22,
    borderRadius: 10,
    backgroundColor: Colors.primary_2,
  },

  dayLabel: {
    color: Colors.text_secondary,
    fontSize: 13,
    marginTop: 6,
  },

  // --- Card (4 stats: Calo – Steps – Exercise – Stand) ---
  metricsCard: {
    width: "100%",
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 10,
  },
  metricIcon: {
    marginBottom: 6,
  },

  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  metricBlock: {
    flex: 1,
    alignItems: "center",
  },

  metricLabel: {
    fontSize: 14,
    color: Colors.text_secondary,
    marginBottom: 4,
  },

  metricValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.text_primary,
  },

  metricSub: {
    fontSize: 12,
    color: Colors.text_secondary,
    marginTop: 2,
  },

  standSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
    alignItems: "center",
  },

  standText: {
    fontSize: 16,
    color: Colors.text_primary,
  },

  // --- Buttons ---
  buttonContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    width: "100%",
    gap: 12,
  },
  buttonWrapper: {
    flex: 1,
  },
  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    elevation: 5,
  },
  shadowPrimary: {
    shadowColor: "#8B5CF6",
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  shadowSecondary: {
    shadowColor: "#06B6D4",
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  /* ===== FOOD ACTION ===== */
  foodActionCard: {
    marginTop: 16,
    marginBottom: 6,
    padding: 16,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  foodTextWrapper: {
    flex: 1,
  },

  foodTitle: {
    color: Colors.text_primary,
    fontSize: 16,
    fontWeight: "600",
  },

  foodDesc: {
    color: Colors.text_secondary,
    fontSize: 13,
    marginTop: 2,
  },
});

export default styles;
