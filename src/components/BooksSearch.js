import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import starIcon from "../../assets/images/star-icon.png";

const screenWidth = Dimensions.get("window").width;

export default function BooksSearch({ data={} }) {

    const getThumbnailUrl = (data={}) => {
        const value = data?.volumeInfo?.imageLinks?.thumbnail;
        return value;
    };

    const getTitle = (data={}) => {
        const value = data?.volumeInfo?.title;
        return value;
    }

    const getAuthor = (data={}) => {
        const values = data?.volumeInfo?.authors;
        const duoAuthors = values.join(" and ");
        const multiAuthors = values.join(", ");
        const author = values?.length > 1 ? values?.length > 2 ? multiAuthors :
        duoAuthors : values[0];
        return author;
    };

    const getAverageRating = (data={}) => {
        const value = data?.saleInfo?.averageRating;
        const averageRating = value ? `${value}` : "N/A";
        return averageRating;
    };

    const getPriceText = (data={}) => {
        const { saleInfo } = data;
        const sale = saleInfo?.saleability;
        const retailPrice = saleInfo?.retailPrice?.amount;
        const currencyCode = saleInfo?.retailPrice?.currencyCode;
        const countryPrice = `${currencyCode} ${retailPrice}`;
        const priceText = sale === "FOR_SALE" ? countryPrice : "FREE";
        return priceText;
    };

    const [
        thumbnailUrl,
        title,
        author,
        rating,
        priceText
    ] = [
        getThumbnailUrl(data),
        getTitle(data),
        getAuthor(data),
        getAverageRating(data),
        getPriceText(data)
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
                    <View style={styles.starContainer}>
                        <Image style={styles.starIcon} source={starIcon} />
                        <Text style={styles.starText}>{rating}</Text>
                    </View>
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
        paddingVertical: 4
    },
    thumbnailContainer: {},
    infoContainer: {
        width: screenWidth - (100 + 12),
        paddingHorizontal: 6
    },
    thumbnailImage: {
        width: 100,
        height: 153.91
    },
    rowText: {
        flexDirection: "row"
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: 600,
        color: "#000",
        paddingBottom: 4,
        flexWrap: "wrap",
        flex: 1
    },
    bookAuthor: {
        fontSize: 16,
        color: "#555",
        paddingBottom: 4
    },
    starContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 6
    },
    starIcon: {
        width: 18,
        height: 18
    },
    starText: {
        fontSize: 16,
        color: "#000",
        paddingLeft: 6
    },
    price: {
        fontSize: 16,
        color: "#555"
    }
});