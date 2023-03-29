import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import NavbarSearch from "../components/NavbarSearch";
import NavFooter from "../components/NavFooter";
import BooksSearch from "../components/BooksSearch";
import useSearchBooks from "../hooks/useSearchBooks";

export default function Search() {
    const { completedBooks, searchBooks } = useSearchBooks();

    useEffect(() => {
        console.log(completedBooks.length);
    }, [completedBooks]);

    const handleSearch = (value) => {
        searchBooks(value);
    };

    return (
        <View style={styles.container}>
            <NavbarSearch
                onChangeSearch={handleSearch}
            />
            <ScrollView style={styles.booksContainer}>
                {completedBooks.map((data, i) => (
                    <BooksSearch key={i} data={data} />
                ))}
            </ScrollView>
            <NavFooter />
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
    }
});