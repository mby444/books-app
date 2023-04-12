import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HamburgerMenu from "./HamburgerMenu";

function Title({ name }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{name}</Text>
    </View>
  );
}

export default function Navbar({ title = "" }) {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={styles.container}>
      <HamburgerMenu onPress={handleMenuPress} />
      <Title name={title} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64,
    backgroundColor: "#50B3F4",
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
  },
});
