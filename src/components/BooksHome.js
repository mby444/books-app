import {
  Image,
  Pressable,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { http2https } from "../utils/string-formatter";

export default function BooksHome({ data = {} }) {
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
    const isForSale = parseInt(retailPrice) > 0 && sale === "FOR_SALE";
    const isFree = parseInt(retailPrice) === 0 || sale === "FREE";
    const priceText = isForSale
      ? countryPrice
      : isFree
      ? "FREE"
      : "UNAVAILABLE";
    return priceText;
  };

  const handleBookPress = () => {
    const bookId = getBookId(data);
    const params = { bookId };
    navigation.navigate("Book", params);
  };

  const [thumbnailUrl, title, priceText] = [
    getThumbnailUrl(data),
    getTitle(data),
    getPriceText(data),
  ];

  return (
    <TouchableOpacity style={styles.container} onPress={handleBookPress}>
      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnail} source={{ uri: thumbnailUrl }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.price} numberOfLines={1}>
          {priceText}
        </Text>
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
