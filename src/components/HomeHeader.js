import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors, parameters } from "../global/styles";
import { Icon, withBadge } from 'react-native-elements';
import { auth, database } from '../../firebase'; // Import Firebase configuration
import { ref, onValue } from 'firebase/database'; // Firebase database functions

export default function HomeHeader({ navigation }) {
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            const userId = currentUser.uid;
            const cartRef = ref(database, `cart/${userId}`);

            // Listen for changes in the cart to update the badge count
            const unsubscribe = onValue(cartRef, (snapshot) => {
                const cartData = snapshot.val();
                if (cartData) {
                    const itemCount = Object.keys(cartData).length;
                    setCartItemCount(itemCount);
                } else {
                    setCartItemCount(0); // Set to 0 if cart is empty
                }
            });

            return () => unsubscribe(); // Cleanup subscription
        }
    }, []);

    const BadgeIcon = withBadge(cartItemCount)(Icon); // Set badge based on cartItemCount

    return (
        <View style={styles.header}>
            <View style={{ alignItems: "center", justifyContent: "center", marginLeft: 15 }}>
                <Icon
                    type="material-community"
                    name="menu"
                    color={colors.cardBackground}
                    size={32}
                    onPress={() => {
                        navigation.toggleDrawer();
                    }}
                />
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: colors.cardBackground, fontSize: 25, fontWeight: "bold" }}>
                    FoodXpress
                </Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center", marginRight: 15 }}>
                <BadgeIcon
                    type="material-community"
                    name="cart"
                    color={colors.cardBackground}
                    size={35}
                    onPress={() => {
                        console.log(navigation.getState())
                        navigation.navigate('CartScreen'); // Navigate to CartScreen
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: colors.buttons,
        height: parameters.headerHeight,
        justifyContent: "space-between",
    },

    headerText: {
        color: colors.headerText,
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 30,
    },
});