import { useEffect, useState } from "react";
import { getApiKey, getBookShelves } from "../utils/config";
import { timedFetch } from "../utils/request";

const useHomeBooks = () => {
  const apiKey = getApiKey();
  const shelfInfo = getBookShelves();
  const [booksReady, setBooksReady] = useState(false);
  const [booksErrorObj, setBooksErrorObj] = useState({});
  const [books, setBooks] = useState([]);

  const getAllBooks = async () => {
    try {
      const reqUrl = `https://www.googleapis.com/books/v1/users/${shelfInfo.userId}/bookshelves/${shelfInfo.shelfId}/volumes?key=${apiKey}`;
      const rawResponse = await timedFetch(reqUrl);
      const response = await rawResponse.json();
      const { items } = response;
      return items;
    } catch (err) {
      const errorObj = {
        error: true,
        message: "Something went wrong",
      };
      setBooksErrorObj(errorObj);
      return [];
    }
  };

  const loadBooks = async () => {
    setBooksReady(false);
    initBooksErrorObj();
    const booksData = await getAllBooks();
    setBooks(booksData);
    setBooksReady(true);
  };

  const reloadBooks = () => {
    loadBooks();
  };

  const initBooksErrorObj = () => {
    setBooksErrorObj({
      error: false,
      message: "",
    });
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return {
    books,
    booksReady,
    booksErrorObj,
    reloadBooks,
  };
};

export default useHomeBooks;
