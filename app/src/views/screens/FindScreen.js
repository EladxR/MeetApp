import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class FindScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Find</Text>
      </View>
    );
  }
}

export default FindScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8ff",
  },
});
