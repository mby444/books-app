import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";
import loadingIcon from "../../assets/images/loading-icon.png";

const screenHeight = Dimensions.get("window").height;

function AnimatedLoader() {
  const rotateAnimate = useRef(new Animated.Value(0)).current;
  const rotateValue = rotateAnimate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const rotateStyle = {
    transform: [{ rotate: rotateValue }],
  };

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnimate, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <Animated.Image style={[styles.icon, rotateStyle]} source={loadingIcon} />
  );
}

export default function Loader() {
  return (
    <View style={styles.container}>
      <AnimatedLoader />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight - 2 * 64,
  },
  icon: {
    width: 75,
    height: 75,
  },
});
