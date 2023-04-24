import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { BooksLoadActionContext } from "../context";

const screenHeight = Dimensions.get("window").height;

export default function TimedOut({ title = "" }) {
  const { load } = useContext(BooksLoadActionContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Pressable style={styles.button} onPress={load}>
        <Text style={styles.buttonText}>Refresh</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight - 2 * 64,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: "#cdcdcd",
    marginTop: 8,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
  },
  text: {
    fontSize: 20,
    color: "#555",
  },
});
