import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase";
class HomeScreen extends Component {
  state = {};
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button
          title="sign out"
          onPress={() => firebase.auth().signOut()}
        ></Button>
      </View>
    );
  }
}

export default HomeScreen;
