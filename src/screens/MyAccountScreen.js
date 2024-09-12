import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import { auth, database } from '../../firebase'; // Import Firebase config
import { ref, get, update } from 'firebase/database';
import { colors } from '../global/styles'; // Import global styles

export default function MyAccountScreen() {
  const [userData, setUserData] = useState({
    name: '',
    family_name: '',
    email: '',
    phone_number: '',
    username: ''
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userId = currentUser.uid;
        const userRef = ref(database, `/users/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log('No user data available');
        }
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = ref(database, `/users/${userId}`);

      try {
        await update(userRef, userData);
        Alert.alert('Success', 'Your information has been updated.');
        setEditing(false); // Exit editing mode
      } catch (error) {
        console.error('Error updating user data:', error);
        Alert.alert('Error', 'There was a problem updating your information.');
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.buttons} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          editable={editing}
          placeholder="Enter your name"
          placeholderTextColor={colors.grey2}
        />

        <Text style={styles.label}>Family Name:</Text>
        <TextInput
          style={styles.input}
          value={userData.family_name}
          onChangeText={(text) => setUserData({ ...userData, family_name: text })}
          editable={editing}
          placeholder="Enter your family name"
          placeholderTextColor={colors.grey2}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          editable={editing}
          keyboardType="email-address"
          placeholder="Enter your email"
          placeholderTextColor={colors.grey2}
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={userData.phone_number}
          onChangeText={(text) => setUserData({ ...userData, phone_number: text })}
          editable={editing}
          keyboardType="phone-pad"
          placeholder="Enter your phone number"
          placeholderTextColor={colors.grey2}
        />
      </View>

      {editing ? (
        <Button title="Save Changes" onPress={handleUpdate} color={colors.buttons} />
      ) : (
        <Button title="Edit Profile" onPress={() => setEditing(true)} color={colors.buttons} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cardbackground, // Match background color with the app's design
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.grey2, // Use consistent text color
    marginTop: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: colors.grey5, // Use consistent border color
    padding: 5,
    fontSize: 18,
    color: colors.grey1, // Use consistent text color for input
    marginBottom: 10,
  },
});
