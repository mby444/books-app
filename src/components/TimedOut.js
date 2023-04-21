import { StyleSheet, Text, View } from 'react-native';

export default function TimedOut() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something went wrong</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: screenHeight - 2 * 64,
    },
    text: {
        fontSize: 20,
        color: "#555",
    },
});