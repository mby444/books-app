import { useEffect, useRef, useState } from "react";

const useSearchBooks = (initialBooks=[]) => {
    const apiKey = "AIzaSyB6B_-JSgw5WAq7AirAC_jZ8Gdd39fyfu8";
    const [searchedBooks, setSearchedBooks] = useState([]);
    const completedBooks = useRef(searchedBooks);

    useEffect(() => {
        setSearchedBooks([]);
        completedBooks.current = initialBooks;
    }, []);

    useEffect(() => {
        completedBooks.current = filterBooks(searchedBooks);
    }, [searchedBooks]);

    const filterBooks = (values=[]) => {
        return values.filter((value) => {
            const hasThumbnail = !!(value?.volumeInfo?.imageLinks?.smallThumbnail && value?.volumeInfo?.imageLinks?.thumbnail);
            const hasAuthors = Array.isArray(value?.volumeInfo?.authors);
            // const hasRating = !!value?.volumeInfo?.averageRating;
            const hasPrice = !!value?.saleInfo?.saleability;
            const isCompleted = hasThumbnail && hasAuthors && /* hasRating && */ hasPrice;
            return isCompleted;
        });
    };

    const searchBooks = (searchQuery, searchOptions={}) => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                const { items } = data;
                if (!items) return setSearchedBooks([]);
                setSearchedBooks(items);
            })
            .catch((err) => {
                setSearchedBooks([]);
                console.log(err);
            });
    };

    return {
        searchedBooks,
        completedBooks: completedBooks.current,
        searchBooks
    };
};

export default useSearchBooks;