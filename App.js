import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { colors } from "./src/global/styles";
import RootNavigator from "./src/navigation/RootNavigator";
import { useEffect } from "react";
import uploadDataToFirebase from "./src/global/uploadDataToFirebase"

export default function App() {
  /*useEffect(() => {
    const uploadData = async () => {
      try {
        await uploadDataToFirebase();
        console.log('Data uploaded successfully!');
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    };

    uploadData();
  }, []);*/
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.statusBar}
      />
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }
});