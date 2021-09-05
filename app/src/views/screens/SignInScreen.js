import "react-native-gesture-handler";
import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
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
import { Colors } from "react-native/Libraries/NewAppScreen";

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
                    username:
                      "@" +
                      result.user.email.substr(
                        0,
                        result.user.email.indexOf("@")
                      ),
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
          paddingTop: 100,
          flex: 1,
          backgroundColor: "#fffafa",
        }}
      >
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../../assests/meetAppLogo.jpeg")}
          />

          {/* <Button
          title="Sign in with Google"
          onPress={() => this.signInWithGoogleAsync()}
        >
          {/* <Image
              style={STYLES.btnImage}
              source={require("../../assests/google.png")}
            /> */}

          <TouchableHighlight
            underlayColor="#E5E6EA"
            style={{
              fontFamily: "AktivGroteskCorp",
              paddingLeft: 15,
              paddingRight: 15,
              borderRadius: 25.5,
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 15,
              width: 300,
              height: 50,
              alignItems: "center",
              alignSelf: "center",
              borderColor: "#E5E6EA",
              borderWidth: 1,
            }}
            onPress={() => this.signInWithGoogleAsync()}
          >
            <View style={styles.button}>
              <Image
                style={styles.buttonImageIconStyle}
                source={require("../../assests/google.png")}
              />
              <View style={styles.buttonIconSeparatorStyle} />
              <Text style={styles.buttonTextStyle}>Sign in with Google</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

export default SignInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: `#7b68ee`,
    borderWidth: 0.5,
    borderColor: "#fff",
    height: 50,
    width: 300,
    borderRadius: 5,
    margin: 5,
    paddingLeft: 8,
    justifyContent: "flex-start",
  },
  buttonImageIconStyle: {
    padding: 3,
    margin: 1,
    height: 30,
    width: 30,
    resizeMode: "stretch",
  },
  buttonTextStyle: {
    color: "#fff",
    marginBottom: 4,
    marginLeft: 40,
    alignItems: "center",
    fontSize: 15,
  },
  buttonIconSeparatorStyle: {
    backgroundColor: "#fff",
    width: 1,
    height: 40,
  },
});
