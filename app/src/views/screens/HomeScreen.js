import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import firebase from "firebase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./Tabs";

const HomeScreen = () => {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default HomeScreen;
