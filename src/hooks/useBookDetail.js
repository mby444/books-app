import { useEffect, useState } from "react";
import { timedFetch } from "../utils/request";

const useBookDetail = (bookId = "") => {
  const [book, setBook] = useState({});
  const [bookReady, setBookReady] = useState(false);
  const [bookNetErrorObj, setBookNetErrorObj] = useState({});
  const [bookErrorUnknown, setBookErrorUnknown] = useState(false);

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
      const isNetError =
        err.message === "RequestTimeoutError" ||
        err.message === "Network request failed";
      if (isNetError) {
        netErrorObj.error = true;
        netErrorObj.message = "No internet";
      } else {
        setBookErrorUnknown(true);
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
    setBookReady(false);
    setBookErrorUnknown(false);
    initBookNetErrorObj();
    getBookInfo().then((book) => {
      setBook(book);
      setBookReady(true);
    });
  };

  const reloadBook = () => {
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
    bookErrorUnknown,
    reloadBook,
  };
};

export default useBookDetail;
