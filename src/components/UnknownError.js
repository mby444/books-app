import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useContext } from "react";
import { BooksLoadActionContext } from "../context";
import errorIcon from "../../assets/images/error-icon.png";

const screenHeight = Dimensions.get("window").height;

export default function UnknownError({ title = "Something went wrong" }) {
  const { load } = useContext(BooksLoadActionContext);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={errorIcon} />
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
    width: 75,
    height: 75,
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
