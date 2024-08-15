import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import { auth, database } from '../../firebase';
import { ref, onValue, remove } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

export default function MyOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Hook to access navigation

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
          onPress={() => navigation.navigate('EditOrderScreen', { orderId: item.id, currentOrder: item })}
        />
        <Button title="Cancel" onPress={() => handleCancelOrder(item.id)} color="red" />
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
        <Text>No orders found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  orderItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
