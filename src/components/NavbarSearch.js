import { Dimensions, Image, Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import searchIcon from "../../assets/images/search-icon.png";

const screenWidth = Dimensions.get("window").width;

function SearchButton({ text="", onSearch=Function() }) {
    return (
        <Pressable
            style={styles.searchButton}
            onPress={() => {
                onSearch(text);
                Keyboard.dismiss();
            }
        }>
            <Image style={styles.searchIcon} source={searchIcon} />
        </Pressable>
    );
}

export default function NavbarSearch({ onSearch=Function(), onFocus=Function(), onBlur=Function() }) {
    const [input, setInput] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder="Search books..."
                    placeholderTextColor="#efefef"
                />
                <SearchButton text={input} onSearch={onSearch} />
            </View>
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
    inputContainer: {
        width: "90%",
        height: 42.5,
        flexDirection: "row"
    },
    searchInput: {
        width: screenWidth * 0.9 - 42.5,
        height: "100%",
        backgroundColor: "#3BA5EA",
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        color: "#fff",
        fontSize: 18,
        paddingHorizontal: 14
    },
    searchButton: {
        width: 42.5,
        height: 42.5,
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        backgroundColor: "#2A6084",
        alignItems: "center",
        justifyContent: "center"
    },
    searchIcon: {
        width: 20,
        height: 20
    }
});