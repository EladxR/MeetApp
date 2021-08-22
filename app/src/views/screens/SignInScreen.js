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

class SignInScreen extends Component {
  state = {};
  signInWithGoogleAsync = async () => {
    console.log("in sign in with google async");
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "473314541276-bptost0h0kpqg10fja637dfdekj4uf22.apps.googleusercontent.com",
        behavior: "web",
        iosClientId:
          "473314541276-ltpvmrkmfnh42kk139m43ed1v33u7njp.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
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
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
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
