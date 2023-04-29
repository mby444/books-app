import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useContext, useState } from "react";
import { BookContext, WishlistActionContext } from "../context";
import {
  getBookId,
  getThumbnailUrl,
  getTitle,
  getAuthor,
  getPublishedDate,
  getPriceText,
} from "../utils/book-data";
import bookmarkIcon from "../../assets/images/bookmark-black-icon-2.png";
import bookmarkCheckedIcon from "../../assets/images/bookmark-checked-black-icon-2.png";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

function BookmarkIcon() {
  const { book } = useContext(BookContext);
  const { addBookWishlist, removeBookWishlist } = useContext(
    WishlistActionContext
  );
  const [isInWishlist, setIsInWishlist] = useState(true);
  const imageSource = isInWishlist ? bookmarkCheckedIcon : bookmarkIcon;

  const toggleBookWishlist = () => {
    try {
      switch (isInWishlist) {
        case true: {
          removeBookWishlist(book.id);
          setIsInWishlist(!isInWishlist);
          break;
        }
        default: {
          addBookWishlist(book);
          setIsInWishlist(!isInWishlist);
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
        <Image style={styles.thumbnailImage} source={{ uri: thumbnailUrl }} />
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
    width: 32,
    height: 32,
  },
});
