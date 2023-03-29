import { StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";

export default function NavbarSearch({ onChangeSearch=Function }) {
    const [input, setInput] = useState("");

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={input}
                onChangeText={(text) => setInput(text)}
                onSubmitEditing={() => onChangeSearch(input)}
                placeholder="Search books..."
                placeholderTextColor="#efefef"
            />
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
        justifyContent: "center"
    },
    searchInput: {
        width: "90%",
        height: 42.5,
        backgroundColor: "#3BA5EA",
        borderRadius: 12,
        color: "#fff",
        fontSize: 18,
        paddingHorizontal: 14
    }
});