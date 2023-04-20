import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Navbar from "../components/Navbar";
import Loader from '../components/Loader';
import BookWishlist from '../components/BookWishlist';
import { BookContext, BookWishlistContext } from '../context';
import useBookWishlist from "../hooks/useBookWishlist";

const screenHeight = Dimensions.get("window").height;

function Empty() {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No results yet.</Text>
    </View>
  );
}

function BooksContainer({ books = [] }) {
  return (
    <ScrollView style={styles.booksContainer}>
      <BookWishlistContext.Provider value={{ wishlist: books }}>
        {books.map((data, i) => (
          <BookContext.Provider value={{ book: data }} key={i}>
            <BookWishlist style={styles.books} data={data} />
          </BookContext.Provider>
        ))}
      </BookWishlistContext.Provider>
    </ScrollView>
  );
}

function DynamicBooksContainer({ books, isLoading }) {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : !books.length ? (
        <Empty />
      ) : (
        <BooksContainer books={books} />
      )}
    </>
  );
}

export default function Wishlist() {
  const { bookWishlist, bookWishlistReady, reloadBookWishlist } = useBookWishlist();

  useFocusEffect(useCallback(() => {
    reloadBookWishlist();
  }, []));

  return (
    <View style={styles.container}>
      <Navbar title="Wishlist" />
      <DynamicBooksContainer books={bookWishlist} isLoading={!bookWishlistReady} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  booksContainer: {
    paddingVertical: 16,
    marginBottom: 64 + 8,
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
});