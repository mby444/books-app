import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { BooksLoadActionContext } from "../context";
import useSearchBooks from "../hooks/useSearchBooks";
import useRewardedAdLoad from "../hooks/useRewardedAdLoad";
import Loader from "../components/Loader";
import NavbarSearch from "../components/NavbarSearch";
import NavFooter from "../components/NavFooter";
import BooksSearch from "../components/BooksSearch";
import Empty from "../components/Empty";
import NotFound from "../components/NotFound";
import TimedOut from "../components/TimedOut";
import UnknownError from "../components/UnknownError";

function BooksContainer({ books = [] }) {
  return (
    <ScrollView style={styles.booksContainer}>
      {books.map((data, i) => (
        <BooksSearch style={styles.books} key={i} data={data} />
      ))}
    </ScrollView>
  );
}

function DynamicBooksContainer({
  books,
  isLoading,
  netErrorObj,
  isNotFoundError,
  isUnknownError = false,
}) {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : netErrorObj.error ? (
        <TimedOut title={netErrorObj.message} />
      ) : isNotFoundError ? (
        <NotFound />
      ) : isUnknownError ? (
        <UnknownError />
      ) : !books.length ? (
        <Empty />
      ) : (
        <BooksContainer books={books} />
      )}
    </>
  );
}

export default function Search() {
  const {
    booksError,
    booksNetErrorObj,
    booksErrorUnknown,
    booksReady,
    completedBooks,
    searchBooks,
    clearBooks,
    reloadSearchedBooks,
  } = useSearchBooks();
  const [navFooterVisible, setNavFooterVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { rewardedAd, loaded: adLoaded } = useRewardedAdLoad();

  useEffect(() => {
    setIsLoading(!booksReady);
  }, [booksReady]);

  useEffect(() => {
    if (adLoaded) rewardedAd.show();
  }, [adLoaded]);

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
      <BooksLoadActionContext.Provider value={{ load: reloadSearchedBooks }}>
        <DynamicBooksContainer
          books={completedBooks}
          isLoading={isLoading}
          netErrorObj={booksNetErrorObj}
          isNotFoundError={booksError}
          isUnknownError={booksErrorUnknown}
        />
      </BooksLoadActionContext.Provider>
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
});
