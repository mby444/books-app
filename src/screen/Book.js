import { ScrollView, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import useBookDetail from "../hooks/useBookDetail";
import useBookWishlist from "../hooks/useBookWishlist";
import { BookContext, BooksLoadActionContext, BookWishlistContext } from "../context";
import Loader from "../components/Loader";
import NavbarBook from "../components/NavbarBook";
import BookInfo from "../components/BookInfo";
import TimedOut from "../components/TimedOut";

function DynamicMainContainer({ isReady = false, netErrorObj = {} }) {
  return !isReady ? <Loader /> : netErrorObj.error ? <TimedOut title={netErrorObj.message} /> : <BookInfo />;
}

export default function Book() {
  const {
    params: { bookId },
  } = useRoute();
  const { book, bookReady, bookNetErrorObj, reloadBook } = useBookDetail(bookId);
  const { bookWishlist, bookWishlistReady } = useBookWishlist();
  const allDataReady = bookReady && bookWishlistReady;

  return (
    <ScrollView style={styles.container}>
      <NavbarBook />
      <BookContext.Provider value={{ book }}>
        <BookWishlistContext.Provider value={{ bookWishlist }}>
          <BooksLoadActionContext.Provider value={{ load: reloadBook }}>
            <DynamicMainContainer isReady={allDataReady} netErrorObj={bookNetErrorObj} />
          </BooksLoadActionContext.Provider>
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
