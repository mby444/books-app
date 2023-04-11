import { useContext } from "react";
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
import { BookContext } from "../context";
import { decodeHTMLEntities, http2https } from "../utils/string-formatter";
import emptyBookImage from "../../assets/images/empty-book.png";

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

export default function BookInfo() {
  const { book } = useContext(BookContext);

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

  const [thumbnail, title, author, publishedDate, priceText, description, buyLink] = [
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
    paddingBottom: 46,
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
