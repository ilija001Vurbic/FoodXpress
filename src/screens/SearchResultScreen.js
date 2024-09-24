import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList } from 'react-native';
import SearchResultCard from '../components/SearchResultCard';
import { database } from '../../firebase'; // Import your Firebase config
import { ref, onValue } from 'firebase/database'; // Import Firebase database functions
import { colors } from "../global/styles";

const SCREEN_WIDTH = Dimensions.get('window').width;

const SearchResultScreen = ({ navigation, route }) => {
    const [restaurantsData, setRestaurantsData] = useState([]);

    useEffect(() => {
        const fetchRestaurantsData = () => {
            const restaurantsRef = ref(database, 'restaurantDetails'); // Adjust the path as necessary
            onValue(restaurantsRef, (snapshot) => {
                const data = snapshot.val() || [];
                setRestaurantsData(Object.values(data)); // Adjust this depending on your data structure
            });
        };

        fetchRestaurantsData();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <FlatList
                    style={{ backgroundColor: colors.cardbackground }}
                    data={restaurantsData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <SearchResultCard
                            screenWidth={SCREEN_WIDTH}
                            images={item.images}
                            averageReview={item.averageReview}
                            numberOfReview={item.numberOfReview}
                            restaurantName={item.restaurantName}
                            farAway={item.farAway}
                            businessAddress={item.businessAddress}
                            productData={item.productData}
                            OnPressRestaurantCard={() => {
                                navigation.navigate("RestaurantHomeScreen", { id: index, restaurant: item.restaurantName });
                            }}
                        />
                    )}
                    ListHeaderComponent={
                        <View>
                            <Text style={styles.listHeader}>{restaurantsData.length} Result(s) for {route.params.item}</Text>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20
    },
    listHeader: {
        color: colors.grey1,
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontWeight: "bold"
    }
});
