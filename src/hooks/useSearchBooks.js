import { useEffect, useRef, useState } from "react";
import {
  deleteStorageData,
  getStorageData,
  setStorageData,
} from "../utils/storage";
import { getApiKey } from "../utils/config";
import { timedFetch } from "../utils/request";

const useSearchBooks = () => {
  const searchedBooksKey = "@searched_books";
  const searchTextKey = "@search_text";
  const searchQueryKey = "@search_query";
  const apiKey = getApiKey();
  const isInitLoaded = useRef(false);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [booksError, setBooksError] = useState(false);
  const [booksNetErrorObj, setBooksNetErrorObj] = useState({});
  const [booksReady, setBooksReady] = useState(false);

  useEffect(() => {
    isInitLoaded.current = false;
    setBooksReady(false);
    loadPastSearchedBooks();
  }, []);

  useEffect(() => {
    setCompletedBooks(filterBooks(searchedBooks));
  }, [searchedBooks]);

  useEffect(() => {
    if (isInitLoaded.current) setBooksReady(true);
  }, [isInitLoaded.current]);

  const loadPastSearchedBooks = async () => {
    const rawPastSearchedBooks = await getStorageData(searchedBooksKey);
    const pastSearchedBooks = JSON.parse(rawPastSearchedBooks || "[]");
    setSearchedBooks(pastSearchedBooks);
    isInitLoaded.current = true;
  };

  const getPastSearchQuery = async () => {
    const text = await getStorageData(searchQueryKey) || "";
    return text?.trim();
  };

  const storeBooks = async (items) => {
    await setStorageData(searchedBooksKey, JSON.stringify(items));
  };

  const storeSearchQuery = async (searchQuery) => {
    await setStorageData(searchQueryKey, String(searchQuery));
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

  const initNetErrorObj = () => {
    setBooksNetErrorObj({
      error: false,
      message: "",
    });
  };

  const searchBooks = (searchQuery) => {
    setBooksReady(false);
    initNetErrorObj();
    storeSearchQuery(searchQuery);
    timedFetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { items } = data;
        if (!items?.length) throw new Error("NotFoundError");
        setBooksError(false);
        setSearchedBooks(items);
        return storeBooks(items);
      })
      .catch((err) => {
        const netErrorObj = {
          error: false,
          message: "",
        };
        const isNetError = err.message === "RequestTimeoutError" || err.message === "Network request failed";
        if (isNetError) {
          netErrorObj.error = true;
          netErrorObj.message = "Something went wrong";
        }
        setBooksNetErrorObj(netErrorObj);
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

  const reloadSearchedBooks = () => {
    setBooksReady(false);
    getPastSearchQuery()
    .then((text) => {
      searchBooks(text);
    });
  };

  return {
    booksError,
    booksNetErrorObj,
    booksReady,
    searchedBooks,
    completedBooks,
    searchBooks,
    clearBooks,
    reloadSearchedBooks,
  };
};

export default useSearchBooks;
