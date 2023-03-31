import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import homeIcon from "../../assets/images/home-icon.png";
import searchIcon from "../../assets/images/search-icon.png";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NavFooter({ position = 0, visible = true }) {
  const navigation = useNavigation();
  const defaultTouchableColor = "#0000";
  const activeTouchableColor = "#2A6084";
  const displayStyle = visible ? "flex" : "none";
  const touchableColors = Array(2).fill(defaultTouchableColor);
  touchableColors[position] = activeTouchableColor;

  const navigate = (target = "Home") => {
    navigation.navigate(target);
  };

  return (
    <View style={[styles.container, { display: displayStyle }]}>
      <View style={styles.touchableIconContainer}>
        <TouchableOpacity
          style={[
            styles.touchableIcon,
            { backgroundColor: touchableColors[0] },
          ]}
          onPress={() => navigate("Home")}
        >
          <Image style={styles.icon} source={homeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.touchableIconContainer}>
        <TouchableOpacity
          style={[
            styles.touchableIcon,
            { backgroundColor: touchableColors[1] },
          ]}
          onPress={() => navigate("Search")}
        >
          <Image style={styles.icon} source={searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 64,
    backgroundColor: "#50B3F4",
    flexDirection: "row",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  touchableIcon: {
    width: 60,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 36,
    height: 36,
  },
});
