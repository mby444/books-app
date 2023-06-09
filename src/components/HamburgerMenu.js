import { Pressable, StyleSheet, View } from "react-native";

export default function HamburgerMenu({ onPress = Function() }) {
  return (
    <Pressable style={styles.barContainer} onPress={() => onPress()}>
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
      <View style={styles.bar}></View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    position: "absolute",
    width: 28,
    height: 16,
    justifyContent: "space-between",
    marginHorizontal: 24,
    zIndex: 2,
  },
  bar: {
    width: "100%",
    height: 2.5,
    backgroundColor: "#fff",
  },
});
