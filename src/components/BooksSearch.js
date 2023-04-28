import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getBookId,
  getThumbnailUrl,
  getTitle,
  getAuthor,
  getPublishedDate,
  getPriceText,
} from "../utils/book-data";

const screenWidth = Dimensions.get("window").width;

export default function BooksSearch({ data = {} }) {
  const navigation = useNavigation();

  const handleBookPress = () => {
    const bookId = getBookId(data);
    const params = { bookId };
    navigation.navigate("Book", params);
  };

  const [thumbnailUrl, title, author, publishedDate, priceText] = [
    getThumbnailUrl(data),
    getTitle(data),
    getAuthor(data),
    getPublishedDate(data),
    getPriceText(data),
  ];

  return (
    <TouchableOpacity style={styles.container} onPress={handleBookPress}>
      <View style={styles.thumbnailContainer}>
        <Image
          style={[styles.thumbnailImage, { width: 100, height: 153.91 }]}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 12,
    paddingBottom: 14,
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
  publisedDateText: {
    fontSize: 16,
    color: "#000",
  },
  price: {
    fontSize: 16,
    color: "#555",
  },
});
