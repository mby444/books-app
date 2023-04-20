import { Dimensions, Image, Pressable, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useContext, useState } from 'react';
import { setStorageData } from '../utils/storage';
import { BookContext, BookWishlistContext } from '../context';
import { http2https } from "../utils/string-formatter";
import bookmarkIcon from "../../assets/images/bookmark-black-icon.png";
import bookmarkCheckedIcon from "../../assets/images/bookmark-checked-black-icon.png";
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;

function BookmarkIcon() {
    const { book } = useContext(BookContext);
    const { wishlist } = useContext(BookWishlistContext);
    const [isInWishlist, setIsInWishlist] = useState(true);
    const imageSource = isInWishlist ? bookmarkCheckedIcon : bookmarkIcon;

    const saveBookWishlist = async (data) => {
        const storageKey = "@book_wishlist";
        const jsonData = JSON.stringify(data);
        await setStorageData(storageKey, jsonData);
    };

    const addToWishlist = async (callback = Function(), errCallback = Function()) => {
        try {
            const filteredBookWishlist = wishlist.filter((b) => b.id !== book.id);
            const newWishlist = [...filteredBookWishlist, book];
            await saveBookWishlist(newWishlist);
            callback();
        } catch (err) {
            console.log("addToWishlist", err);
            errCallback(err);
        }
    };

    const removeFromWishlist = async (callback = Function(), errCallback = Function()) => {
        try {
          const newWishlist = wishlist.filter((b) => b.id !== book.id);
          await saveBookWishlist(newWishlist);
          callback();
        } catch (err) {
          console.log("removeFromWishlist", err);
          errCallback(err);
        }
    }

    const toggleBookWishlist = (callback = Function(), errCallback = Function()) => {
        try {
            const bookInWishlist = isInWishlist;
            switch (bookInWishlist) {
                case true: {
                    removeFromWishlist(() => {
                        setIsInWishlist(!bookInWishlist);
                        callback(!bookInWishlist);
                    });
                    break;
                }
                default: {
                    addToWishlist(() => {
                        setIsInWishlist(!bookInWishlist);
                        callback(!bookInWishlist);
                    });
                }
            }
        } catch (err) {
            console.log("toggleBookWishlist", err);
            errCallback(err);
        }
    };

    const handlePress = () => {
        toggleBookWishlist();
    };

    return (
        <Pressable style={styles.bookmarkPressable} onPress={handlePress}>
            <Image style={styles.bookmarkIcon} source={imageSource} />
        </Pressable>
    );
}

export default function BookWishlist({ data = {} }) {
    const navigation = useNavigation();

    const getBookId = (data = {}) => {
        const bookId = data?.id;
        return bookId;
    };
    
    const getThumbnailUrl = (data = {}) => {
        const value = data?.volumeInfo?.imageLinks?.thumbnail;
        const url = http2https(value);
        return url;
    };
    
    const getTitle = (data = {}) => {
        const value = data?.volumeInfo?.title;
        return value;
    };
    
    const getAuthor = (data = {}) => {
        const values = data?.volumeInfo?.authors;
        const duoAuthors = values.join(" and ");
        const multiAuthors = values.join(", ");
        const author =
          values?.length > 1
            ? values?.length > 2
              ? multiAuthors
              : duoAuthors
            : values[0];
        return author;
    };
    
    const getPublishedDate = (data = {}) => {
        const value = data?.volumeInfo?.publishedDate;
        const dateYear = value ? value.split("-")[0] : "(unknown year)";
        return dateYear;
    };
    
    const formatPriceText = (priceText = "") => {
        priceText = String(priceText);
        const splitted = priceText.split("");
        const formatted = splitted
          .map((v, i) => {
            const reverseIndex = splitted.length - 1 - i;
            const commaShouldPlaced = reverseIndex % 3 === 0 && reverseIndex !== 0;
            const output = commaShouldPlaced ? `${v},` : v;
            return output;
          })
          .join("");
        return formatted;
    };
    
    const getPriceText = (data = {}) => {
        const { saleInfo } = data;
        const sale = saleInfo?.saleability;
        const retailPrice = saleInfo?.retailPrice?.amount;
        const formattedPrice = formatPriceText(retailPrice);
        const currencyCode = saleInfo?.retailPrice?.currencyCode;
        const countryPrice = `${currencyCode} ${formattedPrice}`;
        const isForSale = parseInt(retailPrice) > 0 && sale === "FOR_SALE";
        const isFree = parseInt(retailPrice) === 0 || sale === "FREE";
        const priceText = isForSale
          ? countryPrice
          : isFree
          ? "FREE"
          : "UNAVAILABLE";
        return priceText;
    };

    const [thumbnailUrl, title, author, publishedDate, priceText] = [
        getThumbnailUrl(data),
        getTitle(data),
        getAuthor(data),
        getPublishedDate(data),
        getPriceText(data),
    ];

    const handleBookPress = () => {
        const bookId = getBookId(data);
        const params = { screen: "Book", params: { bookId } };
        navigation.navigate("HomeStack", params);
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleBookPress}>
            <View style={styles.thumbnailContainer}>
                <Image
                    style={styles.thumbnailImage}
                    source={{ uri: thumbnailUrl }}
                />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.rowText}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                    {title}
                </Text>
                </View>
                <View style={styles.rowText}>
                <Text style={styles.bookAuthor} numberOfLines={2}>
                    {author}
                </Text>
                </View>
                <View style={styles.rowText}>
                <Text style={styles.publisedDateText} numberOfLines={1}>
                    {publishedDate}
                </Text>
                </View>
                <View style={styles.rowText}>
                <Text style={styles.price} numberOfLines={1}>
                    {priceText}
                </Text>
                </View>
            </View>
            <View style={styles.bookmarkContainer}>
                <BookmarkIcon />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 12,
        paddingBottom: 16,
    },
    thumbnailContainer: {},
    infoContainer: {
        width: screenWidth - (100 + 12) - 64,
        paddingHorizontal: 6,
    },
    bookmarkContainer: {
        width: 64 - 9,
        alignItems: "center",
        paddingTop: 8,
    },
    thumbnailImage: {
        width: 100,
        height: 153.91,
    },
    rowText: {
        flexDirection: "row",
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 600,
        color: "#000",
        paddingBottom: 4,
        flexWrap: "wrap",
        flex: 1,
    },
    bookAuthor: {
        fontSize: 16,
        color: "#555",
        paddingBottom: 4,
    },
    publisedDateText: {
        fontSize: 16,
        color: "#000",
    },
    price: {
        fontSize: 16,
        color: "#555",
    },
    bookmarkIcon: {
        width: 20,
        height: 20,
    },
});