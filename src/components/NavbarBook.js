import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import arrowLeftIcon from "../../assets/images/arrow-left-icon.png";

export default function NavbarBook() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.arrowLeftIconContainer}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image style={styles.arrowLeftIcon} source={arrowLeftIcon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    alignItems: "center",
  },
  arrowLeftIconContainer: {
    paddingHorizontal: 22.5,
  },
  arrowLeftIcon: {
    width: 24,
    height: 20,
  },
});
