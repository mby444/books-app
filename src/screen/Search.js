import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import useSearchBooks from "../hooks/useSearchBooks";
import NavbarSearch from "../components/NavbarSearch";
import NavFooter from "../components/NavFooter";
import BooksSearch from "../components/BooksSearch";

const screenHeight = Dimensions.get("window").height;

function Empty() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No result yet.</Text>
    </View>
  );
}

function NotFound() {
  return (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundText}>Not found.</Text>
    </View>
  );
}

function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator style={styles.loader} size="large" />
    </View>
  );
}

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
  const { booksError, completedBooks, searchBooks } = useSearchBooks();
  const [navFooterVisible, setNavFooterVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [completedBooks]);

  const handleSearch = (value) => {
    setIsLoading(true);
    searchBooks(value);
  };

  return (
    <View style={styles.container}>
      <NavbarSearch
        onSearch={handleSearch}
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
    marginBottom: 64,
  },
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight - 2 * 64,
  },
  loader: {
    width: 40,
    height: 40,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight - 2 * 64,
  },
  emptyText: {
    fontSize: 20,
    color: "#555",
  },
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
