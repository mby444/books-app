import { useEffect, useState } from "react";
import useStorage from "./useStorage";
import { getStorageData, setStorageData } from "../utils/storage";
import { getApiKey } from "../utils/config";

const useSearchBooks = () => {
  const searchedBooksKey = "@searched_books";
  const apiKey = getApiKey();
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState([]);
  const [booksError, setBooksError] = useState(false);
  const [booksReady, setBooksReady] = useState(false);

  useEffect(() => {
    (async () => {
      const rawPastSearchedBooks = await getStorageData(searchedBooksKey);
      const pastSearchedBooks = JSON.parse(rawPastSearchedBooks || "[]");
      setSearchedBooks(pastSearchedBooks);
      // completeBooks();
      setCompletedBooks(filterBooks(searchedBooks));
      setBooksReady(true);
      // console.log(pastSearchedBooks[0]?.data?.volumeInfo?.title);
    })();
  }, []);

  const completeBooks = () => {
    setCompletedBooks(filterBooks(searchedBooks));
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

  const searchBooks = (searchQuery, searchOptions = {}) => {
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
        // completeBooks();
        setCompletedBooks(filterBooks(searchedBooks));
      })
      .catch((err) => {
        setBooksError(true);
        setSearchedBooks([]);
        // completeBooks();
        setCompletedBooks(filterBooks(searchedBooks));
      })
      .finally(() => {
        setBooksReady(true);
      });
  };

  const resetSearchBooks = () => {
    setSearchedBooks([]);
    // completeBooks();
    setCompletedBooks(filterBooks(searchedBooks));
    setBooksError(false);
    setBooksReady(true);
  };

  return {
    booksError,
    booksReady,
    searchedBooks,
    completedBooks,
    searchBooks,
    resetSearchBooks,
  };
};

export default useSearchBooks;
