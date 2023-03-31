import { ScrollView, StyleSheet, View } from "react-native";
import Navbar from "../components/Navbar";
import NavFooter from "../components/NavFooter";

export default function Home() {
  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView></ScrollView>
      <NavFooter position={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
