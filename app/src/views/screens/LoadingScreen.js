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
import "../../global.js";

class LoadingScreen extends Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
  };
  componentDidMount() {
    global.isLoggedIn = false;
    this.checkIfLoggedIn(this.props.navigation);
  }
  checkIfLoggedIn = (navigation) => {
    console.log("enter check log in" + global.isLoggedIn);
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          // global.isLoggedIn = true;
          this.setState({ isLoggedIn: true, isLoading: false });
        } else {
          // global.isLoggedIn = true;
          this.setState({ isLoggedIn: false, isLoading: false });
        }
      }.bind(this)
    );
  };
  onLogOut = () => {
    this.setState({ isLoggedIn: false, isLoading: false });
    console.log("on log out..");
  };
  render() {
    if (this.state.isLoading) {
      //show loading screen
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (this.state.isLoggedIn) {
      console.log("home");
      return <HomeScreen onLogOut={this.onLogOut} />;
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
