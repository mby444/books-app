import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

export default function HamburgerMenu() {
  return (
    <Pressable style={styles.barContainer}>
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    position: "absolute",
    width: 38,
    height: 20,
    justifyContent: "space-between",
    marginHorizontal: 24,
  },
  bar: {
    width: "100%",
    height: 3.45,
    backgroundColor: "#fff",
  },
});
