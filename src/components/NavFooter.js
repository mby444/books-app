import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import homeIcon from "../../assets/images/home-icon.png";
import searchIcon from "../../assets/images/search-icon.png";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function NavFooter() {
    const navigation = useNavigation();

    const navigate = (target="Home", params={}) => {
        navigation.navigate(target);
    };

    return (
        <View style={styles.container}>
            <View style={styles.touchableIconContainer}>
                <TouchableOpacity
                    onPress={() => {navigate("Home")}}
                >
                    <Image style={styles.icon} source={homeIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.touchableIconContainer}>
                <TouchableOpacity
                    onPress={() => navigate("Search")}
                >
                    <Image style={styles.icon} source={searchIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        justifyContent: "center"
    },
    touchableIconContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "50%"
    },
    icon: {
        width: 40,
        height: 40
    }
});