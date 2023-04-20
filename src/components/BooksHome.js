import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getBookId, getThumbnailUrl, getTitle, getPriceText } from "../utils/book-data";

export default function BooksHome({ data = {} }) {
  const navigation = useNavigation();

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
