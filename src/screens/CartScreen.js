import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { auth, database } from '../../firebase'; // Firebase config
import { ref, onValue, remove } from 'firebase/database'; // Firebase database functions
import { colors } from '../global/styles'; // Your styles

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      const cartRef = ref(database, `cart/${userId}`); // Reference to user's cart in Firebase

      const unsubscribe = onValue(cartRef, (snapshot) => {
        const cartData = snapshot.val();
        if (cartData) {
          const items = Object.entries(cartData).map(([key, value]) => ({ id: key, ...value }));
          setCartItems(items);

          // Calculate the total price
          const cartTotal = items.reduce((acc, item) => acc + item.total, 0);
          setTotal(cartTotal);
        } else {
          setCartItems([]);
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handleRemoveItem = (itemId) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const itemRef = ref(database, `cart/${userId}/${itemId}`);

      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: async () => {
              try {
                await remove(itemRef);
                Alert.alert("Item removed successfully");
              } catch (error) {
                console.error('Error removing item:', error);
                Alert.alert("Error", error.message);
              }
            }
          }
        ]
      );
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.itemText}>Meal: {item.meal}</Text>
      <Text style={styles.itemText}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemText}>Total: R{item.total.toFixed(2)}</Text>
      <Button
        title="Remove"
        onPress={() => handleRemoveItem(item.id)}
        color={colors.buttons}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderCartItem}
          />
          <Text style={styles.totalText}>Total: R{total.toFixed(2)}</Text>
          <Button
            title="Proceed to Checkout"
            onPress={() => navigation.navigate('CheckoutScreen', { total })}
            color={colors.buttons}
          />
        </>
      ) : (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cardbackground,
  },
  cartItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors.grey5,
    borderRadius: 15,
  },
  itemText: {
    fontSize: 16,
    color: colors.grey2,
    marginBottom: 5,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: colors.grey2,
    textAlign: 'center',
    marginTop: 20,
  },
});
