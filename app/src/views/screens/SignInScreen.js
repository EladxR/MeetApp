import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../consts/color";
import STYLES from "../../styles";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";
import { withNavigation } from "react-navigation";

class SignInScreen extends Component {
  state = {};
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = (googleUser) => {
    console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );

          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              if (result.additionalUserInfo.isNewUser) {
                console.log("creating database for user");
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    locale: result.additionalUserInfo.profile.locale,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                  })
                  .then(function (snapshot) {});
              } else {
                firebase
                  .database()
                  .ref("/users/" + result.user.uid)
                  .update({
                    last_logged_in: Date.now(),
                  });
              }
            })
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log("User already signed-in Firebase.");
        }
        console.log("end database");
      }.bind(this)
    );
  };
  signInWithGoogleAsync = async () => {
    console.log("in sign in with google async");
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "187623108708-dkf3vbltft0la5cgj9om6rddd441fpt3.apps.googleusercontent.com",
        iosClientId:
          "187623108708-53h37cnf70f25vuiieiicueu9nk98vfj.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.onSignIn(result);
        this.props.OnLoggedIn();
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  render() {
    return (
      <SafeAreaView
        style={{
          paddingHorizontal: 20,
          flex: 1,
          backgroundColor: COLORS.white,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "row", marginTop: 40 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 22, color: COLORS.dark }}
            >
              meet
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 22,
                color: COLORS.secondary,
              }}
            >
              App
            </Text>
          </View>

          <View style={{ marginTop: 70 }}>
            <Text
              style={{ fontSize: 27, fontWeight: "bold", color: COLORS.dark }}
            >
              Welcome Back,
            </Text>
            <Text
              style={{ fontSize: 19, fontWeight: "bold", color: COLORS.light }}
            >
              Sign in to continuee
            </Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={STYLES.inputContainer}>
              <Icon
                name="mail-outline"
                color={COLORS.light}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput placeholder="Email" style={STYLES.input} />
            </View>
            <View style={STYLES.inputContainer}>
              <Icon
                name="lock-outline"
                color={COLORS.light}
                size={20}
                style={STYLES.inputIcon}
              />
              <TextInput
                placeholder="Password"
                style={STYLES.input}
                secureTextEntry
              />
            </View>
            <View style={STYLES.btnPrimary}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Sign In
              </Text>
            </View>
            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={STYLES.line}></View>
              <Text style={{ marginHorizontal: 5, fontWeight: "bold" }}>
                OR
              </Text>
              <View style={STYLES.line}></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={STYLES.btnSecondary}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Sign in with
                </Text>
                <Image
                  style={STYLES.btnImage}
                  source={require("../../assests/facebook.png")}
                />
              </View>
              <View style={{ width: 10 }}></View>
              <TouchableOpacity onPress={() => this.signInWithGoogleAsync()}>
                <View style={STYLES.btnSecondary}>
                  <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                    Sign in with
                  </Text>
                  <Image
                    style={STYLES.btnImage}
                    source={require("../../assests/google.png")}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
              marginTop: 40,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: COLORS.light, fontWeight: "bold" }}>
              Don`t have an account ?
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              <Text style={{ color: COLORS.pink, fontWeight: "bold" }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            title="click me"
            onPress={() => this.signInWithGoogleAsync()}
          ></Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default SignInScreen;
