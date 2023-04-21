import { useEffect, useState } from "react";
import { getApiKey, getBookShelves } from "../utils/config";
import { timedFetch } from "../utils/request";

const useHomeBooks = () => {
  const apiKey = getApiKey();
  const shelfInfo = getBookShelves();
  const [booksReady, setBooksReady] = useState(false);
  const [booksError, setBooksError] = useState(false);
  const [books, setBooks] = useState([]);

  const getAllBooks = async () => {
    try {
      const reqUrl = `https://www.googleapis.com/books/v1/users/${shelfInfo.userId}/bookshelves/${shelfInfo.shelfId}/volumes?key=${apiKey}`;
      const rawResponse = await timedFetch(reqUrl);
      const response = await rawResponse.json();
      const { items } = response;
      return items;
    } catch (err) {
      console.log("useHomeBooks", err);
      return [];
    }
  };

  const loadBooks = async () => {
    const booksData = await getAllBooks();
    setBooks(booksData);
    setBooksReady(true);
  };

  useEffect(() => {
    setBooksReady(false);
    loadBooks();
  }, []);

  return {
    books,
    booksReady,
  };
};

export default useHomeBooks;
