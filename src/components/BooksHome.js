import {
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function BooksHome({ data = {} }) {
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

  const [thumbnailUrl, title, priceText] = [
    getThumbnailUrl(data),
    getTitle(data),
    getPriceText(data),
  ];

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnail} source={{ uri: thumbnailUrl }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bookTitle} numberOfLines={2}>{title}</Text>
        <Text style={styles.price} numberOfLines={1}>{priceText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginVertical: 2.5,
    width: 100,
    height: 153.91 + 50,
  },
  thumbnailContainer: {},
  thumbnail: {
    width: 100,
    height: 153.91,
  },
  textContainer: {
    width: "100%",
    height: 30,
  },
  bookTitle: {
    fontSize: 12,
    color: "#000",
    fontWeight: 800,
  },
  price: {
    fontSize: 9,
    color: "#555",
    fontWeight: 600,
  },
});
