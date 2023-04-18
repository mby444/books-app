import {
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useBookDetail from "../hooks/useBookDetail";
import useBookWishlist from "../hooks/useBookWishlist";
import { BookContext, BookWishlistContext } from "../context";
import Loader from "../components/Loader";
import NavbarBook from "../components/NavbarBook";
import BookInfo from "../components/BookInfo";

function DynamicMainContainer({ isReady = false }) {
  return !isReady ? <Loader /> : <BookInfo />;
}

export default function Book() {
  const {
    params: { bookId },
  } = useRoute();
  const { book, bookReady } = useBookDetail(bookId);
  const { bookWishlist, bookWishlistReady } = useBookWishlist();
  const allDataReady = bookReady && bookWishlistReady;

  return (
    <ScrollView style={styles.container}>
      <NavbarBook />
      <BookContext.Provider value={{ book }}>
        <BookWishlistContext.Provider value={{ bookWishlist }}>
          <DynamicMainContainer isReady={allDataReady} />
        </BookWishlistContext.Provider>
      </BookContext.Provider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
