import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../utils/storage";

export default function useBookWishlist() {
    const [bookWishlist, setBookWishlist] = useState([]);
    const [bookWishlistReady, setBookWishlistReady] = useState(false);
    const storageKey = "@book_wishlist";

    const genBookWishlist = async () => {
        const wishlistJSON = await getStorageData(storageKey);
        const wishlist = wishlistJSON && typeof wishlistJSON === "string" ? JSON.parse(wishlistJSON) : [];
        return wishlist;
    };
    
    const loadBookWishlist = () => {
        setBookWishlistReady(false);
        genBookWishlist()
        .then((wishlist) => {
            setBookWishlist(wishlist);
            setBookWishlistReady(true);
        })
        .catch((err) => {
            console.log(err)
            setBookWishlistReady(false);
        });
    };

    const reloadBookWishlist = () => {
        loadBookWishlist();
    };

    useEffect(() => {
        loadBookWishlist();
    }, []);

    return {
        bookWishlist,
        bookWishlistReady,
        reloadBookWishlist,
    };
}