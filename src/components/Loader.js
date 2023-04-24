import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";

const screenHeight = Dimensions.get("window").height;

export default function Loader({ height = screenHeight - 2 * 64 }) {
  return (
    <View style={[styles.loaderContainer, { height }]}>
      <ActivityIndicator style={styles.loader} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
