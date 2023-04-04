import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { createContext, useContext } from "react";
import Navbar from "../components/Navbar";
import NavFooter from "../components/NavFooter";
import BooksHome from "../components/BooksHome";
import useHomeBooks from "../hooks/useHomeBooks";

const screenHeight = Dimensions.get("window").height;

const BooksContext = createContext([]);

function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator style={styles.loader} size="large" />
    </View>
  );
}

function BooksRow({ books = [] }) {
  return (
    <View style={styles.booksRow}>
      <View style={styles.booksSubRow}>
        {books.map((book) => (
          <BooksHome data={book} />
        ))}
      </View>
    </View>
  );
}

function BooksRowContainer({ rowsCount = 0 }) {
  const { books } = useContext(BooksContext);
  const getBooksRows = () => {
    const output = [];
    Array(rowsCount)
      .fill(1)
      .forEach((v, i) => {
        const booksCopy = [...books];
        const startIndex = 3 * i;
        const nextIndex = startIndex + 3;
        const booksRow = booksCopy.slice(startIndex, nextIndex);
        output.push(booksRow);
      });
    return output;
  };

  const booksRows = getBooksRows();

  return (
    <ScrollView style={styles.booksRowContainer}>
      {booksRows.map((booksRow, i) => (
        <BooksRow books={booksRow} key={i} />
      ))}
    </ScrollView>
  );
}

function DynamicBooksContainer({ isReady = false }) {
  const { books } = useContext(BooksContext);
  const rowsCount = Math.ceil(books.length / 3);

  return !isReady ? (
    <Loader />
  ) : (
    <BooksRowContainer rowsCount={rowsCount} />
  );
}

export default function Home() {
  const { books, booksReady } = useHomeBooks();

  return (
    <View style={styles.container}>
      <Navbar />
      <BooksContext.Provider value={{ books }}>
        <DynamicBooksContainer isReady={booksReady} />
      </BooksContext.Provider>
      <NavFooter position={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight - 2 * 64,
  },
  booksRowContainer: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 64,
  },
  booksRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  booksSubRow: {
    width: 116 * 3,
    flexDirection: "row",
  },
});
