import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import useSearchBooks from "../hooks/useSearchBooks";
import Loader from "../components/Loader";
import NavbarSearch from "../components/NavbarSearch";
import NavFooter from "../components/NavFooter";
import BooksSearch from "../components/BooksSearch";
import Empty from "../components/Empty";
import NotFound from "../components/NotFound";

function BooksContainer({ books = [] }) {
  return (
    <ScrollView style={styles.booksContainer}>
      {books.map((data, i) => (
        <BooksSearch style={styles.books} key={i} data={data} />
      ))}
    </ScrollView>
  );
}

function DynamicBooksContainer({ books, isLoading, isNotFoundError }) {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isNotFoundError ? (
        <NotFound />
      ) : !books.length ? (
        <Empty />
      ) : (
        <BooksContainer books={books} />
      )}
    </>
  );
}

export default function Search() {
  const { booksError, booksReady, completedBooks, searchBooks, clearBooks } =
    useSearchBooks();
  const [navFooterVisible, setNavFooterVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(!booksReady);
  }, [booksReady]);

  const handleSearch = (value) => {
    setIsLoading(true);
    searchBooks(value);
  };

  const handleEmptySearch = () => {
    clearBooks();
  };

  return (
    <View style={styles.container}>
      <NavbarSearch
        onSearch={handleSearch}
        onEmptyText={handleEmptySearch}
        onFocus={() => setNavFooterVisible(false)}
        onBlur={() => setNavFooterVisible(true)}
      />
      <DynamicBooksContainer
        books={completedBooks}
        isLoading={isLoading}
        isNotFoundError={booksError}
      />
      <NavFooter position={1} visible={navFooterVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  booksContainer: {
    paddingVertical: 8,
    marginBottom: 64 + 8,
  },
});
