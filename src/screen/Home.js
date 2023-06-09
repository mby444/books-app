import { ScrollView, StyleSheet, View } from "react-native";
import { useContext, useEffect } from "react";
import useHomeBooks from "../hooks/useHomeBooks";
import { BooksLoadActionContext, BooksListContext } from "../context";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import NavFooter from "../components/NavFooter";
import BooksHome from "../components/BooksHome";
import TimedOut from "../components/TimedOut";
import UnknownError from "../components/UnknownError";

function BooksRow({ books = [] }) {
  return (
    <View style={styles.booksRow}>
      <View style={styles.booksSubRow}>
        {books.map((book, i) => (
          <BooksHome data={book} key={i} />
        ))}
      </View>
    </View>
  );
}

function BooksRowContainer({ rowsCount = 0 }) {
  const { books } = useContext(BooksListContext);
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

function DynamicBooksContainer({ isReady = false, errorObj = {}, isUnknownError = false, }) {
  const { books } = useContext(BooksListContext);
  const rowsCount = Math.ceil(books.length / 3);

  return !isReady ? (
    <Loader />
  ) : errorObj.error ? (
    <TimedOut title={errorObj.message} />
  ) : isUnknownError ? (
    <UnknownError />
  ) : (
    <BooksRowContainer rowsCount={rowsCount} />
  );
}

export default function Home() {
  const { books, booksReady, booksErrorObj, booksErrorUnknown, reloadBooks } = useHomeBooks();

  return (
    <View style={styles.container}>
      <Navbar title="MBY444 BOOKS" />
      <BooksListContext.Provider value={{ books }}>
        <BooksLoadActionContext.Provider value={{ load: reloadBooks }}>
          <DynamicBooksContainer
            isReady={booksReady}
            errorObj={booksErrorObj}
            isUnknownError={booksErrorUnknown}
          />
        </BooksLoadActionContext.Provider>
      </BooksListContext.Provider>
      <NavFooter position={0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  booksRowContainer: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 64,
  },
  booksRow: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 12,
  },
  booksSubRow: {
    width: 116 * 3,
    flexDirection: "row",
  },
});
