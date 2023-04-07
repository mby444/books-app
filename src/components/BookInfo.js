import { useContext } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BookContext } from "../screen/Book";

const dimension = Dimensions.get("window");
const screenWidth = dimension.width;

export default function BookInfo() {
  const { book } = useContext(BookContext);

  const getThumnail = (data = {}) => {
    const thumbnail = data?.volumeInfo?.imageLinks?.large;
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
    if (!publishedDate) return "(Unknown year)";
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
    const isForSale = parseInt(retailPrice) > 0 && sale === "FOR_SALE";
    const isFree = parseInt(retailPrice) === 0 || sale === "FREE";
    const priceText = isForSale
      ? countryPrice
      : isFree
      ? "GET FREE"
      : "UNAVAILABLE";
    return priceText;
  };

  const formatDescription = (value = "") => {
    const formatted = value
      .replace(/(\<br\>|\<br \/\>)/g, "\n")
      .replace(/<[^>]*>/g, "");
    return formatted;
  };

  const getDescription = (data = {}) => {
    const description = data?.volumeInfo?.description;
    if (!description) return "(No description)";
    const formattedDescription = formatDescription(description);
    return formattedDescription;
  };

  const [thumbnail, title, author, publishedDate, price, description] = [
    getThumnail(book),
    getTitle(book),
    getAuthor(book),
    getPublishedDate(book),
    getPriceText(book),
    getDescription(book),
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: thumbnail }} />
      </View>
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
        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>{price}</Text>
        </Pressable>
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
