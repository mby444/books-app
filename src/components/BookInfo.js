import { useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BookContext, BookWishlistContext } from "../context";
import { deleteStorageData, getStorageData, setStorageData } from "../utils/storage";
import { decodeHTMLEntities, http2https } from "../utils/string-formatter";
import emptyBookImage from "../../assets/images/empty-book.png";
import bookmarkIcon from "../../assets/images/bookmark-blue-icon.png";
import bookmarkCheckedIcon from "../../assets/images/bookmark-checked-blue-icon.png";

const dimension = Dimensions.get("window");
const screenWidth = dimension.width;

function Thumbnail({ uri, altImage }) {
  const imageSource = uri ? { uri: http2https(uri) } : altImage;

  return (
    <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource} />
    </View>
  );
}

function BuyButton({ buyLink, priceText }) {
  const isAvailable = priceText !== "UNAVAILABLE";
  const buttonDisabledStyle = !isAvailable ? styles.buyButtonDisabled : null;

  const openBuyLink = () => {
    Linking.canOpenURL(buyLink)
      .then((supported) => {
        if (!supported) throw new Error("URL not supported");
        return Linking.openURL(buyLink);
      })
      .catch((err) => {
        Alert.alert("Something went wrong");
        console.log("openBuyLink", err);
      });
  };

  const handlePress = () => {
    if (!isAvailable) return;
    openBuyLink();
  };

  return (
    <Pressable style={[styles.buyButton, buttonDisabledStyle]} onPress={handlePress}>
      <Text style={styles.buyButtonText}>{priceText}</Text>
    </Pressable>
  );
}

function SaveButton() {
  const { book } = useContext(BookContext);
  const { bookWishlist } = useContext(BookWishlistContext);
  const [isSaved, setIsSaved] = useState(false);

  const getIsInWishlist = () => {
    return bookWishlist.filter((b) => b.id === book.id).length > 0;
  };
  
  const saveBookWishlist = async (data) => {
    const storageKey = "@book_wishlist";
    const jsonData = JSON.stringify(data);
    await setStorageData(storageKey, jsonData);
  };

  const addToWishlist = async (callback = Function(), errCallback = Function()) => {
    try {
      const filteredBookWishlist = bookWishlist.filter((b) => b.id !== book.id);
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
      const newWishlist = bookWishlist.filter((b) => b.id !== book.id);
      await saveBookWishlist(newWishlist);
      callback();
    } catch (err) {
      console.log("removeFromWishlist", err);
      errCallback(err);
    }
  };

  const handleSavePress = () => {
    addToWishlist(() => {
      setIsSaved(true);
    });
  };

  const handleUnsavePress = () => {
    removeFromWishlist(() => {
      setIsSaved(false);
    });
  };

  useEffect(() => {
    const isInWishlist = getIsInWishlist();
    setIsSaved(isInWishlist);
    console.log(bookWishlist.length);
  }, []);

  return isSaved ? (
    <Pressable style={styles.unsaveButton} onPress={handleUnsavePress}>
      <Image style={styles.unsaveButtonIcon} source={bookmarkCheckedIcon} />
      <Text style={styles.unsaveButtonText}>Added</Text>
    </Pressable>
  ) : (
    <Pressable style={styles.saveButton} onPress={handleSavePress}>
      <Image style={styles.saveButtonIcon} source={bookmarkIcon} />
      <Text style={styles.saveButtonText}>Add to wishlist</Text>
    </Pressable>
  );
}

export default function BookInfo() {
  const { book } = useContext(BookContext);

  const getBookId = (data) => {
    const { id } = data;
    return id;
  };

  const getThumnail = (data = {}) => {
    const imageLinks = data?.volumeInfo?.imageLinks;
    const [thumbnail1, thumbnail2, thumbnail3, thumbnail4, thumbnail5] = [
      imageLinks?.large,
      imageLinks?.extraLarge,
      imageLinks?.medium,
      imageLinks?.small,
      imageLinks?.thumbnail,
    ];
    const thumbnail = thumbnail1 || thumbnail2 || thumbnail3 || thumbnail4 || thumbnail5;
    return thumbnail;
  };

  const getTitle = (data = {}) => {
    const title = data?.volumeInfo?.title;
    const subtitle = data?.volumeInfo?.subtitle;
    const completedTitle = subtitle ? `${title}: ${subtitle}` : title;
    return completedTitle;
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

  const formatPublishedDate = (value = "") => {
    const splittedValue = value.split("-");
    if (splittedValue.length !== 3) return value;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthsIndex = parseInt(splittedValue[1]) - 1;
    const formatted = `${splittedValue[2]} ${months[monthsIndex]} ${splittedValue[0]}`;
    return formatted;
  };

  const getPublishedDate = (data = {}) => {
    const publishedDate = data?.volumeInfo?.publishedDate;
    if (!publishedDate) return "(Unknown release date)";
    const publishedDateText = `Released on ${formatPublishedDate(
      publishedDate
    )}`;
    return publishedDateText;
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
    const buyText = `Buy ${countryPrice}`;
    const isForSale = parseInt(retailPrice) > 0 && sale === "FOR_SALE";
    const isFree = parseInt(retailPrice) === 0 || sale === "FREE";
    const priceText = isForSale
      ? buyText
      : isFree
      ? "GET FREE"
      : "UNAVAILABLE";
    return priceText;
  };

  const formatDescription = (value = "") => {
    const formatted = value
      .replace(/(\<br\>|\<br \/\>)/g, "\n")
      .replace(/<[^>]*>/g, "");
      const decoded = decodeHTMLEntities(formatted);
    return decoded;
  };

  const getDescription = (data = {}) => {
    const description = data?.volumeInfo?.description;
    if (!description) return "(No description)";
    const formattedDescription = formatDescription(description);
    return formattedDescription;
  };

  const getBuyLink = (data ={}) => {
    const buyLink = data?.saleInfo?.buyLink;
    return buyLink;
  };

  const [id, thumbnail, title, author, publishedDate, priceText, description, buyLink] = [
    getBookId(book),
    getThumnail(book),
    getTitle(book),
    getAuthor(book),
    getPublishedDate(book),
    getPriceText(book),
    getDescription(book),
    getBuyLink(book),
  ];

  return (
    <View>
      <Thumbnail uri={thumbnail} altImage={emptyBookImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.authorContainer}>
        <Text style={styles.author}>{author}</Text>
      </View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{publishedDate}</Text>
      </View>
      <View style={styles.buyButtonContainer}>
        <BuyButton buyLink={buyLink} priceText={priceText} />
      </View>
      <View style={styles.saveButtonContainer}>
        <SaveButton bookId={id} />
      </View>
      <View style={styles.aboutTitleContainer}>
        <Text style={styles.aboutTitle}>About this book</Text>
      </View>
      <View style={styles.aboutTextContainer}>
        <Text style={styles.aboutText}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: screenWidth * 0.75,
    height: (screenWidth * 0.75 * 409.15) / 280,
  },
  titleContainer: {
    paddingTop: 72,
    paddingBottom: 36,
    paddingHorizontal: 26,
  },
  title: {
    fontSize: 26,
    fontWeight: 500,
    color: "#222",
  },
  authorContainer: {
    paddingHorizontal: 26,
    paddingBottom: 16,
  },
  author: {
    fontSize: 14,
    color: "#555",
    fontWeight: 500,
  },
  dateContainer: {
    paddingHorizontal: 26,
    paddingBottom: 46,
  },
  date: {
    fontSize: 16,
    color: "#555",
    fontWeight: 500,
  },
  buyButtonContainer: {
    paddingHorizontal: 26,
    paddingBottom: 20,
  },
  buyButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#3BA5EA",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buyButtonDisabled: {
    backgroundColor: "#bbb",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  saveButtonContainer: {
    paddingHorizontal: 26,
    paddingBottom: 46,
  },
  saveButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#0000",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#2A6084",
  },
  saveButtonText: {
    color: "#2A6084",
    paddingLeft: 6,
  },
  unsaveButtonContainer: {
    paddingHorizontal: 26,
    paddingBottom: 46,
  },
  unsaveButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#0000",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#2A6084",
  },
  unsaveButtonText: {
    color: "#2A6084",
    paddingLeft: 6,
  },
  aboutTitleContainer: {
    paddingHorizontal: 26,
    paddingBottom: 16,
  },
  aboutTitle: {
    fontSize: 24,
    color: "#242424",
    fontWeight: 500,
  },
  aboutTextContainer: {
    paddingHorizontal: 26,
    paddingBottom: 64,
  },
  aboutText: {
    color: "#222",
  },
});
