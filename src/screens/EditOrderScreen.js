import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { auth, database } from '../../firebase';
import { ref, update } from 'firebase/database';
import { CheckBox } from 'react-native-elements';
import { colors } from '../global/styles'; // Import colors from your global styles

export default function EditOrderScreen({ route, navigation }) {
  const { orderId, currentOrder } = route.params;

  // Extract the first item from the items array
  const firstItem = currentOrder?.items[0] || {};
  const [quantity, setQuantity] = useState(firstItem?.quantity?.toString() || '1');
  const [total, setTotal] = useState(firstItem?.total || 0);
  const [selectedItems, setSelectedItems] = useState(firstItem?.selectedItems || []);

  // Function to recalculate the total based on the quantity
  const calculateTotal = (quantity) => {
    const pricePerItem = firstItem?.total / (firstItem?.quantity || 1); // Avoid division by zero
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
        await update(orderRef, {
          ...currentOrder,
          items: [
            {
              ...firstItem,
              quantity: quantityNumber,
              total,
              selectedItems,
            },
          ],
        });
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
        value={firstItem?.meal || ''}
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
      {firstItem?.selectedItems?.map((item, index) => (
        <CheckBox
          key={index}
          title={item}
          checked={selectedItems.includes(item)}
          onPress={() => handleItemChange(item)}
          containerStyle={styles.checkboxContainer} // Apply consistent styling to checkbox
          textStyle={styles.checkboxText} // Apply consistent styling to checkbox text
          checkedColor={colors.buttons} // Consistent color for checked checkbox
        />
      ))}
      <Text style={styles.totalLabel}>Total: €{total.toFixed(2)}</Text>
      <Button title="Save Changes" onPress={handleSave} color={colors.buttons} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cardbackground, // Match background color from HomeScreen
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: colors.grey2, // Consistent text color
  },
  input: {
    height: 40,
    borderColor: colors.grey5, // Use consistent border color
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5, // Rounded corners for consistency
    backgroundColor: colors.cardbackground, // Match input background color
  },
  checkboxContainer: {
    backgroundColor: 'transparent', // Transparent background for checkbox
    borderWidth: 0, // No border for checkbox
    padding: 0, // Remove padding for better alignment
    margin: 0, // Remove margin for better alignment
  },
  checkboxText: {
    color: colors.grey2, // Consistent checkbox text color
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.grey2, // Consistent text color
    marginVertical: 20,
  },
});
