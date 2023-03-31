import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

export default function BooksSearch({ data = {} }) {
  const getThumbnailUrl = (data = {}) => {
    const value = data?.volumeInfo?.imageLinks?.thumbnail;
    return value;
  };

  const getTitle = (data = {}) => {
    const value = data?.volumeInfo?.title;
    const maxLength = 50;
    const additionalValue = value.length > maxLength ? "..." : "";
    const limitedValue = value.substr(0, maxLength) + additionalValue;
    return limitedValue;
  };

  const getAuthor = (data = {}) => {
    const values = data?.volumeInfo?.authors;
    const maxLength = 64;
    const duoAuthors = values.join(" and ");
    const multiAuthors = values.join(", ");
    const author =
      values?.length > 1
        ? values?.length > 2
          ? multiAuthors
          : duoAuthors
        : values[0];
    const additionalValue = author.length > maxLength ? "..." : "";
    const limitedAuthor = author.substr(0, maxLength) + additionalValue;
    return limitedAuthor;
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
    const priceText =
      sale === "FOR_SALE"
        ? countryPrice
        : sale === "FREE"
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

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnailImage} source={{ uri: thumbnailUrl }} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rowText}>
          <Text style={styles.bookTitle}>{title}</Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.bookAuthor}>{author}</Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.publisedDateText}>{publishedDate}</Text>
        </View>
        <View style={styles.rowText}>
          <Text style={styles.price}>{priceText}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  thumbnailContainer: {},
  infoContainer: {
    width: screenWidth - (100 + 12),
    paddingHorizontal: 6,
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
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 6,
  },
  starIcon: {
    width: 18,
    height: 18,
  },
  starText: {
    fontSize: 16,
    color: "#000",
    paddingLeft: 6,
  },
  publisedDateText: {
    fontSize: 16,
    color: "#000",
  },
  price: {
    fontSize: 16,
    color: "#555",
  },
});
