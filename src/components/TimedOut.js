import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import { BooksLoadActionContext } from "../context";
import towerIcon from "../../assets/images/tower-icon.png";

const screenHeight = Dimensions.get("window").height;

export default function TimedOut({ title = "" }) {
  const { load } = useContext(BooksLoadActionContext);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={towerIcon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <Pressable style={styles.button} onPress={load}>
        <Text style={styles.buttonText}>Retry</Text>
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
  iconContainer: {
    paddingBottom: 6,
  },
  icon: {
    width: 100,
    height: 100,
  },
  textContainer: {
    paddingBottom: 6,
  },
  text: {
    fontSize: 20,
    color: "#c3c3c3",
  },
  button: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#c3c3c3",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "#c3c3c3",
  },
});
