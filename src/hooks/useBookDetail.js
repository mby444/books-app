import { useEffect, useState } from "react";
import { timedFetch } from "../utils/request";

const useBookDetail = (bookId = "") => {
  const [book, setBook] = useState({});
  const [bookReady, setBookReady] = useState(false);
  const [bookNetErrorObj, setBookNetErrorObj] = useState({});

  const getBookInfo = async () => {
    try {
      const baseUrl = "https://www.googleapis.com/books/v1/volumes/";
      const url = baseUrl + bookId;
      const rawBook = await timedFetch(url);
      const book = await rawBook.json();
      return book;
    } catch (err) {
      console.log("getBookInfo", err);
      const netErrorObj = {
        error: false,
        message: "",
      };
      if (err.message === "RequestTimeoutError") {
        netErrorObj.error = true;
        netErrorObj.message = "Something went wrong";
      }
      setBookNetErrorObj(netErrorObj);
      return {};
    }
  };

  const initBookNetErrorObj = () => {
    setBookNetErrorObj({
      error: false,
      message: "",
    });
  };

  const loadBook = () => {
    initBookNetErrorObj();
    getBookInfo().then((book) => {
      setBook(book);
      setBookReady(true);
    });
  };

  const reloadBook = () => {
    setBookReady(false);
    loadBook();
  };

  useEffect(() => {
    setBookReady(false);
    loadBook();
  }, []);

  return {
    book,
    bookReady,
    bookNetErrorObj,
    reloadBook,
  };
};

export default useBookDetail;
