import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpScreen from "./app/src/views/screens/SignUpScreen";
import SignInScreen from "./app/src/views/screens/SignInScreen";
import HomeScreen from "./app/src/views/screens/HomeScreen";
import LoadingScreen from "./app/src/views/screens/LoadingScreen";
import Tabs from "./app/src/views/screens/Tabs.js";
import * as firebase from "firebase";
import { firebaseConfig } from "./config";
/*if (!firebase.apps.length) {
  firebase.initializeApp({});
} else {
  firebase.app(); // if already initialized, use that one
}*/

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class App extends Component {
  render() {
    return <SignInScreen />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
