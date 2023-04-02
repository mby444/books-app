import { useEffect, useRef, useState } from "react";
import { getApiKey, getBookShelves } from "../utils/config";

const useHomeBooks = () => {
    const apiKey = getApiKey();
    const shelfInfo = getBookShelves();
    const [booksReady, setBooksReady] = useState(false);
    const [books, setBooks] = useState([]);

    const getAllBooks = async () => {
        try {
            const reqUrl = `https://www.googleapis.com/books/v1/users/${shelfInfo.userId}/bookshelves/${shelfInfo.shelfId}/volumes?key=${apiKey}`;
            const rawResponse = await fetch(reqUrl);
            const response = await rawResponse.json();
            const { items } = response;
            return items;
        } catch (err) {
            console.log("useHomeBooks", err);
            return [];
        }
    };

    useEffect(() => {
        setBooksReady(false);
        (async () => {
            const booksData = await getAllBooks();
            setBooks(booksData);
            setBooksReady(true);
        })();
    }, []);

    return {
        books,
        booksReady,
    };
};

export default useHomeBooks;
