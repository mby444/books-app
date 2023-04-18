import { useEffect, useState } from "react";
import { getStorageData } from "../utils/storage";

export default function useBookWishlist() {
    const [bookWishlist, setBookWishlist] = useState([]);
    const [bookWishlistReady, setBookWishlistReady] = useState(false);

    const genBookWishlist = async () => {
        const storageKey = "@book_wishlist";
        const wishlistJSON = await getStorageData(storageKey);
        const wishlist = wishlistJSON && typeof wishlistJSON === "string" ? JSON.parse(wishlistJSON) : [];
        return wishlist;
    };

    useEffect(() => {
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
    }, []);

    return {
        bookWishlist,
        bookWishlistReady,
    };
}