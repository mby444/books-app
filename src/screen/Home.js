import { ActivityIndicator, FlatList, ScrollView, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import NavFooter from "../components/NavFooter";
import BooksHome from "../components/BooksHome";
import useHomeBooks from "../hooks/useHomeBooks";

function Loader() {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator style={styles.loader} size="large" />
    </View>
  );
}

function BooksRow({ books }) {
  return (
    <View style={styles.booksRow}>
      <BooksHome data={books[0]} />
    </View>
  );
}

function BooksRowContainer({ books = [] }) {
  return (
    <ScrollView style={styles.booksRowContainer}>
      <BooksRow books={books} />
    </ScrollView>
  );
}

function DynamicBooksContainer({ books, isReady }) {
  return (
    !isReady ? (
      <Loader />
    ) : (
      <BooksRowContainer books={books} />
    )
  );
}

export default function Home() {
  const { books, booksReady } = useHomeBooks();

  useEffect(() => {
    console.log(books.length);
  });

  return (
    <View style={styles.container}>
      <Navbar />
      <DynamicBooksContainer books={books} isReady={booksReady} />
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 64
  },
  booksRow: {
    flexDirection: "row",
    justifyContent: "center",
  }
});
