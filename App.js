import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { colors } from "./src/global/styles";
import RootNavigator from "./src/navigation/RootNavigator";
import AppNavigator from "./src/navigation/stackNavigator";

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