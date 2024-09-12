import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, Dimensions } from 'react-native';
import { auth, database } from '../../firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { colors } from '../global/styles'; // Make sure to import the colors

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function MyOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Hook to access navigation

  // Log navigation state
  const navState = useNavigationState(state => state);
  useEffect(() => {
    console.log('Navigation State:', navState);
  }, [navState]);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      const ordersRef = ref(database, `orders/${userId}`);

      const unsubscribe = onValue(ordersRef, (snapshot) => {
        const ordersData = snapshot.val();
        if (ordersData) {
          const formattedOrders = Object.entries(ordersData).map(([key, value]) => ({ id: key, ...value }));
          setOrders(formattedOrders);
        } else {
          setOrders([]);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const handleCancelOrder = (orderId) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const orderRef = ref(database, `orders/${userId}/${orderId}`);

      Alert.alert(
        "Cancel Order",
        "Are you sure you want to cancel this order?",
        [
          {
            text: "No",
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: async () => {
              try {
                await remove(orderRef);
                Alert.alert("Order canceled successfully");
              } catch (error) {
                console.error('Error canceling order:', error);
                Alert.alert("Error canceling order", error.message);
              }
            }
          }
        ]
      );
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Meal: {item.meal}</Text>
      <Text style={styles.orderText}>Quantity: {item.quantity}</Text>
      <Text style={styles.orderText}>Total: R{item.total}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => 
            navigation.navigate('EditOrderScreen', { orderId: item.id, currentOrder: item })}
          color={colors.buttons}
        />
        <Button
          title="Cancel"
          onPress={() => handleCancelOrder(item.id)}
          color={colors.buttons}
        />
        <Button
          title="Review"
          onPress={() =>
            navigation.navigate('SearchScreen', {
              screen: 'ReviewOrderScreen',
              params: { orderId: item.id }
            })}
          color={colors.buttons}
        />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrderItem}
        />
      ) : (
        <Text style={styles.noOrdersText}>No orders found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cardbackground // Match background color from HomeScreen
  },
  orderItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: colors.grey5, // Match background color from HomeScreen
    borderRadius: 15, // Match border radius from HomeScreen
  },
  orderText: {
    fontSize: 16,
    color: colors.grey2, // Match text color from HomeScreen
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  noOrdersText: {
    fontSize: 16,
    color: colors.grey2, // Match text color from HomeScreen
    textAlign: 'center',
    marginTop: 20,
  },
});
