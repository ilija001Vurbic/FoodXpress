import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { database } from '../../firebase'; // Import your Firebase config
import { ref, onValue } from 'firebase/database'; // Import Firebase database functions
import MenuCard from '../components/MenuCard';

export function Route1({ navigation }) {
    const [menuDetailedData, setMenuDetailedData] = useState([]);

    // Fetching menu detailed data from Firebase
    useEffect(() => {
        const menuDetailedRef = ref(database, 'menuDetails'); // Adjust the path as necessary
        onValue(menuDetailedRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Transform data if needed (e.g., converting to an array)
                const menuArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                console.log('Fetched menuDetailedData:', menuArray); // Log the fetched data
                setMenuDetailedData(menuArray);
            }
        });
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.view2}>
                <FlatList 
                    style={{ backgroundColor: 'white' }}
                    data={menuDetailedData}
                    keyExtractor={(item) => item.id} // Using id as key
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { navigation.navigate("PreferenceScreen", { index: item.id }) }}>
                            <MenuCard 
                                productName={item.meal}
                                image={item.image}
                                price={item.price}
                                productDetails={item.details}
                            />
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

export const Route2 = () => (<View style={styles.scene} />);
export const Route3 = () => (<View style={styles.scene} />);
export const Route4 = () => (<View style={{ ...styles.scene, backgroundColor: "green" }} />);
export const Route5 = () => (<View style={styles.scene} />);
export const Route6 = () => (<View style={styles.scene} />);
export const Route7 = () => (<View style={styles.scene} />);
export const Route8 = () => (<View style={styles.scene} />);

const styles = StyleSheet.create({
    scene: {
        flex: 1,
        backgroundColor: '#673ab7',
    },
    view2: {
        marginTop: 5,
        paddingBottom: 20,
    },
});
