import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class ProfileScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff8dc",
  },
});
