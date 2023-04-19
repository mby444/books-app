import { useEffect, useRef, useState } from "react";
import {
  deleteStorageData,
  getStorageData,
  setStorageData,
} from "../utils/storage";
import { getApiKey } from "../utils/config";

const useSearchBooks = () => {
  const searchedBooksKey = "@searched_books";
  const searchTextKey = "@search_text";
  const apiKey = getApiKey();
  const isInitLoaded = useRef(false);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [booksError, setBooksError] = useState(false);
  const [booksReady, setBooksReady] = useState(false);

  useEffect(() => {
    isInitLoaded.current = false;
    setBooksReady(false);
    (async () => {
      const rawPastSearchedBooks = await getStorageData(searchedBooksKey);
      const pastSearchedBooks = JSON.parse(rawPastSearchedBooks || "[]");
      setSearchedBooks(pastSearchedBooks);
      isInitLoaded.current = true;
    })();
  }, []);

  useEffect(() => {
    setCompletedBooks(filterBooks(searchedBooks));
  }, [searchedBooks]);

  useEffect(() => {
    if (isInitLoaded.current) setBooksReady(true);
  }, [isInitLoaded.current]);

  const storeBooks = async (items) => {
    await setStorageData(searchedBooksKey, JSON.stringify(items));
  };

  const filterBooks = (values = []) => {
    return values.filter((value) => {
      const hasThumbnail = !!(
        value?.volumeInfo?.imageLinks?.smallThumbnail &&
        value?.volumeInfo?.imageLinks?.thumbnail
      );
      const hasAuthors = Array.isArray(value?.volumeInfo?.authors);
      const hasPrice = !!value?.saleInfo?.saleability;
      const isCompleted = hasThumbnail && hasAuthors && hasPrice;
      return isCompleted;
    });
  };

  const searchBooks = (searchQuery) => {
    setBooksReady(false);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { items } = data;
        if (!items?.length) throw new Error();
        setBooksError(false);
        setSearchedBooks(items);
        return storeBooks(items);
      })
      .catch((err) => {
        setBooksError(true);
        setSearchedBooks([]);
        return storeBooks([]);
      })
      .finally(() => {
        setBooksReady(true);
      });
  };

  const clearBooks = () => {
    setBooksReady(false);
    deleteStorageData(searchTextKey)
      .then(() => {
        return deleteStorageData(searchedBooksKey);
      })
      .catch((err) => {
        console.log("ClearBooksError", err);
      })
      .finally(() => {
        setSearchedBooks([]);
        setBooksReady(true);
      });
  };

  return {
    booksError,
    booksReady,
    searchedBooks,
    completedBooks,
    searchBooks,
    clearBooks,
  };
};

export default useSearchBooks;
