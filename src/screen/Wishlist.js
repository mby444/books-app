import { ScrollView, StyleSheet, View } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  BookContext,
  BookWishlistContext,
  WishlistActionContext,
} from "../context";
import { getStorageData, setStorageData } from "../utils/storage";
import useBookWishlist from "../hooks/useBookWishlist";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Empty from "../components/Empty";
import BookWishlist from "../components/BookWishlist";
import BannerAdmob from "../components/BannerAdmob";

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
  const { bookWishlist, bookWishlistReady, reloadBookWishlist } =
    useBookWishlist();
  const storageKey = "@book_wishlist";

  const saveBookWishlist = async (data) => {
    const jsonData = JSON.stringify(data);
    await setStorageData(storageKey, jsonData);
  };

  const addBookWishlist = (data) => {
    getStorageData(storageKey)
      .then((response) => JSON.parse(response))
      .then((wishlist) => {
        const hadAdded = !!wishlist.find((w) => w.id === data.id);
        if (hadAdded) return;
        const newWishlist = [...wishlist, data];
        return saveBookWishlist(newWishlist);
      })
      .catch((err) => {
        console.log("addBookWishlist", err);
      });
  };

  const removeBookWishlist = (bookId) => {
    getStorageData(storageKey)
      .then((response) => JSON.parse(response))
      .then((wishlist) => {
        const newWishlist = wishlist.filter((w) => w.id !== bookId);
        return saveBookWishlist(newWishlist);
      })
      .catch((err) => {
        console.log("removeBookWishlist", err);
      });
  };

  useFocusEffect(
    useCallback(() => {
      reloadBookWishlist();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Navbar title="Wishlist" />
      <WishlistActionContext.Provider
        value={{ addBookWishlist, removeBookWishlist }}
      >
        <DynamicBooksContainer
          books={bookWishlist}
          isLoading={!bookWishlistReady}
        />
      </WishlistActionContext.Provider>
      <BannerAdmob />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  booksContainer: {
    paddingVertical: 16,
    // backgroundColor: "#222",
  },
});
