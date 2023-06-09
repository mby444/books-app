import {
  Dimensions,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { setStorageData } from "../utils/storage";
import useStorage from "../hooks/useStorage";
import searchIcon from "../../assets/images/search-icon.png";

const screenWidth = Dimensions.get("window").width;

function SearchButton({
  text = "",
  onSearch = Function(),
  onPress = Function(),
}) {
  const handlePress = () => {
    if (String(text).trim()) {
      onPress();
      onSearch(text);
    }
    Keyboard.dismiss();
  };

  return (
    <Pressable style={styles.searchButton} onPress={handlePress}>
      <Image style={styles.searchIcon} source={searchIcon} />
    </Pressable>
  );
}

export default function NavbarSearch({
  onSearch = Function(),
  onFocus = Function(),
  onBlur = Function(),
  onEmptyText = Function(),
}) {
  const inputStorage = useStorage("@search_text");
  const [input, setInput] = useState("");

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => onFocus());
    Keyboard.addListener("keyboardDidHide", () => onBlur());
    setInput(inputStorage.value);
  }, [inputStorage.value]);

  const handleChangeText = (text) => {
    setInput(text);
    if (!String(text).trim()) onEmptyText();
  };

  const handleSearch = (text = "") => {
    if (!text.trim()) return;
    onSearch(text);
  };

  const postInput = (text = "") => setStorageData(inputStorage.key, text);
  const storeInput = () => inputStorage.set(input);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          value={input}
          onChangeText={(text) => {
            postInput(text);
            handleChangeText(text);
          }}
          onSubmitEditing={() => {
            storeInput();
            handleSearch(input);
          }}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          placeholder="Search books..."
          placeholderTextColor="#efefef"
        />
        <SearchButton text={input} onSearch={handleSearch} />
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
    justifyContent: "center",
  },
  inputContainer: {
    width: "90%",
    height: 42.5,
    flexDirection: "row",
  },
  searchInput: {
    width: screenWidth * 0.9 - 42.5,
    height: "100%",
    backgroundColor: "#3BA5EA",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    color: "#fff",
    fontSize: 18,
    paddingHorizontal: 14,
  },
  searchButton: {
    width: 42.5,
    height: 42.5,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: "#2A6084",
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});
