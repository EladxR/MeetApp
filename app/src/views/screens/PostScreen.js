import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class PostScreen extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Text>post</Text>
      </View>
    );
  }
}

export default PostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8ff",
  },
});
