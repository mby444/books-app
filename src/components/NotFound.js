import {
    Dimensions,
    StyleSheet,
    Text,
    View,
} from "react-native";

const screenHeight = Dimensions.get("window").height;

export default function NotFound() {
    return (
        <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>Not found.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    notFoundContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: screenHeight - 2 * 64,
    },
    notFoundText: {
        fontSize: 20,
        color: "#555",
    },
});