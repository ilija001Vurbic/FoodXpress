import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, database } from '../../firebase';
import { ref, update } from 'firebase/database';
import { CheckBox } from 'react-native-elements';

export default function EditOrderScreen({ route, navigation }) {
    const { orderId, currentOrder } = route.params;
    const [quantity, setQuantity] = useState(currentOrder.quantity.toString()); // Store as string initially
    const [total, setTotal] = useState(currentOrder.total); // Initial total based on current order
    const [selectedItems, setSelectedItems] = useState(currentOrder.selectedItems || []); // Load selected items
  
    // Function to recalculate the total based on the quantity
    const calculateTotal = (quantity) => {
      const pricePerItem = currentOrder.total / currentOrder.quantity;
      return pricePerItem * quantity;
    };
  
    useEffect(() => {
      const quantityNumber = parseInt(quantity, 10);
      if (!isNaN(quantityNumber) && quantityNumber > 0) {
        const newTotal = calculateTotal(quantityNumber);
        setTotal(newTotal);
      }
    }, [quantity]);
  
    const handleSave = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const orderRef = ref(database, `orders/${userId}/${orderId}`);
  
        // Validate and convert quantity to a number
        const quantityNumber = parseInt(quantity, 10);
  
        if (isNaN(quantityNumber) || quantityNumber <= 0) {
          Alert.alert('Invalid quantity', 'Please enter a valid quantity greater than 0.');
          return;
        }
  
        try {
          await update(orderRef, { meal: currentOrder.meal, quantity: quantityNumber, total, selectedItems });
          Alert.alert('Success', 'Order updated successfully');
          navigation.goBack(); // Go back to the previous screen
        } catch (error) {
          console.error('Error updating order:', error);
          Alert.alert('Error', 'Failed to update order. Please try again.');
        }
      }
    };
  
    const handleItemChange = (itemName) => {
      setSelectedItems((prevItems) =>
        prevItems.includes(itemName)
          ? prevItems.filter((item) => item !== itemName)
          : [...prevItems, itemName]
      );
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Meal</Text>
        <TextInput
          style={styles.input}
          value={currentOrder.meal}
          editable={false} // Make the meal field non-editable
        />
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={text => setQuantity(text)} // No conversion here, just update state
          keyboardType="numeric"
        />
        <Text style={styles.label}>Selected Items</Text>
        {currentOrder.selectedItems.map((item, index) => (
          <CheckBox
            key={index}
            title={item}
            checked={selectedItems.includes(item)}
            onPress={() => handleItemChange(item)}
          />
        ))}
        <Text style={styles.label}>Total: R{total.toFixed(2)}</Text>
        <Button title="Save Changes" onPress={handleSave} />
      </View>
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
