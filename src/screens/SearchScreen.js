import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableWithoutFeedback } from 'react-native';
import SearchComponent from '../components/SearchComponent';
import { database } from '../../firebase'; // Import your Firebase config
import { ref, onValue } from 'firebase/database'; // Import Firebase database functions
import { colors } from "../global/styles";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function SearchScreen({ navigation }) {
    const [filterData, setFilterData] = useState([]);
    const [filterData2, setFilterData2] = useState([]);

    useEffect(() => {
        const fetchFilterData = () => {
            const filterRef = ref(database, 'filter');
            onValue(filterRef, (snapshot) => {
                const data = snapshot.val() || [];
                setFilterData(Object.values(data));
            });
        };

        const fetchFilterData2 = () => {
            const filterRef2 = ref(database, 'filter2'); // Assuming filter2 is the correct path for filterData2
            onValue(filterRef2, (snapshot) => {
                const data = snapshot.val() || [];
                setFilterData2(Object.values(data));
            });
        };

        fetchFilterData();
        fetchFilterData2();
    }, []);

    return (
        <View style={{ flex: 1, marginBottom: 10, paddingTop: 20 }}>
            <SearchComponent />
            <View style={{ marginTop: 10 }}>
                <View>
                    <FlatList
                        data={filterData2}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    navigation.navigate("SearchResultScreen", { item: item.name });
                                }}
                            >
                                <View style={styles.imageView}>
                                    <ImageBackground
                                        style={styles.image}
                                        source={{ uri: item.image }}
                                    >
                                        <View style={styles.textView}>
                                            <Text style={{ color: colors.cardbackground }}>{item.name}</Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        ListHeaderComponent={<Text style={styles.listHeader}>Top Categories</Text>}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imageView: {
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: SCREEN_WIDTH * 0.4475,
        height: SCREEN_WIDTH * 0.4475,
        marginLeft: SCREEN_WIDTH * 0.035,
        marginBottom: SCREEN_WIDTH * 0.035
    },
    image: {
        height: SCREEN_WIDTH * 0.4475,
        width: SCREEN_WIDTH * 0.4475,
        borderRadius: 10,
    },
    listHeader: {
        fontSize: 16,
        color: colors.grey2,
        paddingBottom: 10,
        marginLeft: 12
    },
    textView: {
        height: SCREEN_WIDTH * 0.4475,
        width: SCREEN_WIDTH * 0.4475,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52,0.3)'
    },
});
