import { useEffect, useState } from "react";
import { getApiKey } from "../utils/config";

const useSearchBooks = (initialBooks = []) => {
  const apiKey = getApiKey();
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [completedBooks, setCompletedBooks] = useState(searchedBooks);
  const [booksError, setBooksError] = useState(false);

  useEffect(() => {
    setSearchedBooks([]);
    setCompletedBooks(initialBooks);
  }, []);

  useEffect(() => {
    setCompletedBooks(filterBooks(searchedBooks));
  }, [searchedBooks]);

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
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        const { items } = data;
        if (!items?.length) throw new Error();
        setBooksError(false);
        setSearchedBooks(items);
      })
      .catch((err) => {
        setBooksError(true);
        setSearchedBooks([]);
      });
  };

  const resetSearchBooks = () => {
    setSearchedBooks([]);
    setBooksError(false);
  };

  return {
    booksError,
    searchedBooks,
    completedBooks,
    searchBooks,
    resetSearchBooks,
  };
};

export default useSearchBooks;
