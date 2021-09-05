import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class SettingScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Setting</Text>
      </View>
    );
  }
}

export default SettingScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8ff",
  },
});
