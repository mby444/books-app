import { useEffect, useState } from "react";

const useBookDetail = (bookId = "") => {
  const [book, setBook] = useState({});
  const [bookReady, setBookReady] = useState(false);

  const getBookInfo = async () => {
    try {
      const baseUrl = "https://www.googleapis.com/books/v1/volumes/";
      const url = baseUrl + bookId;
      const rawBook = await fetch(url);
      const book = await rawBook.json();
      return book;
    } catch (err) {
      console.log("getBookInfo", err);
      return {};
    }
  };

  useEffect(() => {
    setBookReady(false);
    getBookInfo().then((book) => {
      setBook(book);
      setBookReady(true);
    });
  }, []);

  return {
    book,
    bookReady,
  };
};

export default useBookDetail;
