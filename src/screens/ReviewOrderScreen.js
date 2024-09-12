import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, set } from 'firebase/database';
import { database, auth } from '../../firebase'; // Ensure correct import paths
import { colors } from '../global/styles';

export default function ReviewOrderScreen({ route, navigation }) {
  const { orderId } = route.params;
  const [reviewText, setReviewText] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.uri);
      }
    } else {
      alert('Camera permission is required!');
    }
  };

  const handleSubmitReview = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const reviewRef = ref(database, `reviews/${userId}/${orderId}`);
      set(reviewRef, {
        review: reviewText,
        imageUri: imageUri,
        timestamp: new Date().toISOString(),
      })
      .then(() => {
        navigation.goBack(); // Navigate back after submitting
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write a Review</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your review"
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />
      <Button title="Take Photo" onPress={handleTakePhoto} color={colors.buttons} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Submit Review" onPress={handleSubmitReview} color={colors.buttons} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cardbackground,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  textInput: {
    height: 100,
    borderColor: colors.grey5,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
});
