import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import NavbarSearch from "../components/NavbarSearch";
import NavFooter from "../components/NavFooter";
import BooksSearch from "../components/BooksSearch";
import useSearchBooks from "../hooks/useSearchBooks";

const screenHeight = Dimensions.get("window").height;

function Loader() {
    return (
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
        </View>
    );
}

function BooksContainer({ books=[] }) {
    return (
        <ScrollView style={styles.booksContainer}>
            {books.map((data, i) => <BooksSearch key={i} data={data} />)}
        </ScrollView>
    )
}

export default function Search() {
    const { completedBooks, searchBooks } = useSearchBooks();
    const [navFooterVisible, setNavFooterVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(false);
    }, [completedBooks]);

    const handleSearch = (value) => {
        setIsLoading(true);
        searchBooks(value);
    };

    return (
        <View style={styles.container}>
            <NavbarSearch
                onSearch={handleSearch}
                onFocus={() => setNavFooterVisible(false)}
                onBlur={() => setNavFooterVisible(true)}
            />
            {isLoading ? <Loader /> : <BooksContainer books={completedBooks} />}
            <NavFooter position={1} visible={navFooterVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    booksContainer: {
        paddingVertical: 8,
        marginBottom: 64
    },
    loaderContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: screenHeight - 2 * 64
    }
});