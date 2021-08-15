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

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    console.log("enter check log in");
    firebase.auth().onAuthStateChanged(
      function (user) {
        if (user) {
          this.props.navigation.navigate("Home");
        } else {
          console.log("to sign in");
          this.props.navigation.navigate("SignIn");
        }
      }.bind(this)
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
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
