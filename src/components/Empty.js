import { Dimensions, StyleSheet, Text, View } from "react-native";

const screenHeight = Dimensions.get("window").height;

export default function Empty() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No results yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight - 2 * 64,
  },
  emptyText: {
    fontSize: 20,
    color: "#555",
  },
});
