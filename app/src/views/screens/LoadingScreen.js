import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import firebase from "firebase";
import { StackActions } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import SignInScreen from "./SignInScreen";

class LoadingScreen extends Component {
  state = {
    isLoggedIn: false,
  };
  componentDidMount() {
    this.checkIfLoggedIn(this.props.navigation);
  }
  checkIfLoggedIn = (navigation) => {
    console.log("enter check log in");
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          this.setState({ isLoggedIn: true });
        } else {
          this.setState({ isLoggedIn: false });
        }
      }.bind(this)
    );
  };
  render() {
    if (this.state.isLoggedIn) {
      console.log("home");
      return <HomeScreen />;
    } else {
      console.log("sign in");
      return <SignInScreen />;
    }
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
