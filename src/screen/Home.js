import { Pressable, StyleSheet, Text, View } from "react-native";
import Navbar from "../components/Navbar";
import NavFooter from "../components/NavFooter";

export default function Home({ route, navigation }) {
    return (
        <View style={styles.container}>
            <Navbar />
            <NavFooter />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});