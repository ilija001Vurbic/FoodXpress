import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { auth, database } from '../../firebase'; // Firebase config
import { ref, remove, push, set, onValue } from 'firebase/database'; // Firebase database functions
import { colors } from '../global/styles'; // Your styles

export default function CheckoutScreen({ route, navigation }) {
  const { total } = route.params;
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const cartRef = ref(database, `cart/${userId}`); // Reference to user's cart in Firebase

      // Fetch cart items
      const unsubscribe = onValue(cartRef, (snapshot) => {
        const cartData = snapshot.val();
        if (cartData) {
          const items = Object.entries(cartData).map(([key, value]) => ({ id: key, ...value }));
          setCartItems(items);
        }
      });

      return () => unsubscribe(); // Cleanup subscription
    }
  }, []);

  const handleCheckout = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const cartRef = ref(database, `cart/${userId}`); // Reference to user's cart in Firebase
      const ordersRef = ref(database, `orders/${userId}`); // Reference to user's orders in Firebase

      // Prepare the order data
      const orderData = {
        orderId: push(ordersRef).key, // Generate unique order ID
        items: cartItems,
        total: total,
        timestamp: new Date().toISOString(), // Store the time of order
      };

      try {
        // Add order to 'orders' node in Firebase
        const newOrderRef = push(ordersRef); // Create a new order node
        await set(newOrderRef, orderData);   // Add order data to Firebase

        // Clear the cart after adding order
        await remove(cartRef); // Clear the cart

        // Success message
        Alert.alert("Success", "Your order has been placed!");
        navigation.navigate('HomeScreen'); // Navigate back to home screen after successful checkout
      } catch (error) {
        console.error('Error during checkout:', error);
        Alert.alert("Error", "Failed to complete the checkout. Please try again.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Total Amount: R{total.toFixed(2)}</Text>
      <Button
        title="Confirm Purchase"
        onPress={handleCheckout}
        color={colors.buttons}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.cardbackground,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
