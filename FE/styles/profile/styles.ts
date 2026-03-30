import { StyleSheet } from "react-native";
import { Colors } from "@/styles/Common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  content: {
    alignItems: "center",
  },

  circleTop: {
    position: "absolute",
    top: -60,
    right: -90,
    width: 320,
    height: 320,
    borderRadius: 320,
    backgroundColor: "#8B5CF6",
    opacity: 0.18,
  },

  circleBottom: {
    position: "absolute",
    bottom: -200,
    left: -90,
    width: 320,
    height: 320,
    borderRadius: 320,
    backgroundColor: "#06B6D4",
    opacity: 0.09,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 22,
  },

  card: {
    width: "100%",
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginBottom: 14,
  },

  cardLabel: {
    color: Colors.text_secondary,
    fontSize: 14,
    marginBottom: 6,
  },

  cardValue: {
    color: Colors.text_primary,
    fontSize: 18,
    fontWeight: "600",
  },

  editBtn: {
    position: "absolute",
    right: 12,
    top: 26,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(6,182,212,0.15)", // primary_2 overlay
    borderWidth: 1,
    borderColor: Colors.primary_2,
  },

  editBtnText: {
    color: Colors.primary_2,
    fontSize: 14,
    fontWeight: "600",
  },

  selectWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary_2,
  },

  select: {
    color: Colors.text_primary,
  },

  input: {
    color: Colors.text_primary,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary_2,
    paddingBottom: 4,
    marginTop: -4,
  },

  logoutBtn: {
    width: "90%",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 20,
    marginHorizontal: "auto",
  },

  logoutGradient: {
    paddingVertical: 14,
    borderRadius: 16,
  },

  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  infoSection: {
    marginTop: 24,
  },

  sectionTitle: {
    color: "#A5B4FC",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
});

export default styles;
