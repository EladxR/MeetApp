import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import SignUpScreen from "./app/src/views/screens/SignUpScreen";
import SignInScreen from "./app/src/views/screens/SignInScreen";
import HomeScreen from "./app/src/views/screens/HomeScreen";
import LoadingScreen from "./app/src/views/screens/LoadingScreen";

import * as firebase from "firebase";
import { firebaseConfig } from "./config";
/*if (!firebase.apps.length) {
  firebase.initializeApp({});
} else {
  firebase.app(); // if already initialized, use that one
}*/

//const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
