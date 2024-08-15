import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import { auth, database } from '../../firebase'; // Import Firebase config
import { ref, get, update } from 'firebase/database';

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
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          editable={editing}
        />

        <Text style={styles.label}>Family Name:</Text>
        <TextInput
          style={styles.input}
          value={userData.family_name}
          onChangeText={(text) => setUserData({ ...userData, family_name: text })}
          editable={editing}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={userData.email}
          onChangeText={(text) => setUserData({ ...userData, email: text })}
          editable={editing}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={userData.phone_number}
          onChangeText={(text) => setUserData({ ...userData, phone_number: text })}
          editable={editing}
          keyboardType="phone-pad"
        />
      </View>

      {editing ? (
        <Button title="Save Changes" onPress={handleUpdate} />
      ) : (
        <Button title="Edit Profile" onPress={() => setEditing(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    fontSize: 18,
  },
});
