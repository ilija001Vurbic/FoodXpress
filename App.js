import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { colors } from "./src/global/styles";
import RootNavigator from "./src/navigation/RootNavigator";
import '@react-native-firebase/app';  // Ensure this is imported
import '@react-native-firebase/auth'; // Ensure this is imported
import '@react-native-firebase/database'; // Ensure this is imported

export default function App() {
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