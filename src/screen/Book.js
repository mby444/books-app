import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { createContext } from "react";
import { useRoute } from "@react-navigation/native";
import useBookDetail from "../hooks/useBookDetail";
import NavbarBook from "../components/NavbarBook";
import BookInfo from "../components/BookInfo";

const dimension = Dimensions.get("window");
const screenHeight = dimension.height;

export const BookContext = createContext({});

function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator style={styles.loader} size="large" />
    </View>
  );
}

function DynamicMainContainer({ isReady = false }) {
  return !isReady ? <Loader /> : <BookInfo />;
}

export default function Book() {
  const {
    params: { bookId },
  } = useRoute();
  const { book, bookReady } = useBookDetail(bookId);

  return (
    <ScrollView style={styles.container}>
      <NavbarBook />
      <BookContext.Provider value={{ book }}>
        <DynamicMainContainer isReady={bookReady} />
      </BookContext.Provider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight - 2 * 64,
  },
  container: {
    flex: 1,
  },
});
