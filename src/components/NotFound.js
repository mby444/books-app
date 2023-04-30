import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import notFoundIcon from "../../assets/images/not-found-icon.png";

const screenHeight = Dimensions.get("window").height;

export default function NotFound() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={notFoundIcon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Not found.</Text>
      </View>
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
  textContainer: {},
  text: {
    fontSize: 20,
    color: "#c3c3c3",
  },
});
