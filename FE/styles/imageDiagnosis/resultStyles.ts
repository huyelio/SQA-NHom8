import { Colors } from "@/styles/Common";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
  },
  resultImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text_primary,
    marginBottom: 6,
  },

  summaryText: {
    color: Colors.text_secondary,
    fontSize: 15,
    marginBottom: 14,
    lineHeight: 20,
  },

  scroll: {
    flex: 1
  },

  sectionTitle: {
    color: Colors.text_primary,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },

  detectCard: {
    backgroundColor: Colors.card,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
  },

  detectTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary_2,
  },

  detectDetail: {
    fontSize: 14,
    color: Colors.text_secondary,
    marginTop: 4,
  },

  // Tabs
  tabWrapper: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 4,
    marginBottom: 10,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: Colors.primary,
  },

  tabText: {
    textAlign: "center",
    color: Colors.text_secondary,
    fontWeight: "500",
  },

  activeTabText: {
    color: "#fff",
  },

  // Bullet list
  listBox: {
    padding: 12,
    backgroundColor: Colors.card,
    borderRadius: 14,
  },

  bulletItem: {
    color: Colors.text_primary,
    marginBottom: 8,
    lineHeight: 20,
  },

  // Recommendation box
  recommendBox: {
    marginTop: 16,
    padding: 14,
    backgroundColor: Colors.card,
    borderRadius: 14,
  },

  recommendText: {
    color: Colors.text_secondary,
    fontSize: 14,
    lineHeight: 20,
  },

  // Button
  buttonContainer: {
    marginTop: 18,
    borderRadius: 14,
    overflow: "hidden",
  },

  buttonGradient: {
    paddingVertical: 14,
    borderRadius: 14,
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
