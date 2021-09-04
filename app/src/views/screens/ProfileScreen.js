import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, Platform } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import firebase from "firebase";
//import database from "@react-native-firebase/database";

class ProfileScreen extends Component {
  state = {
    firstName: "",
    lastName: "",
    mail: "",
    profilePicture: "",
  };
  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    const userID = firebase.auth().currentUser.uid;
    console.log(userID);
    firebase
      .database()
      .ref("/users/" + userID)
      .on("value", (snapshot) => {
        this.setState({
          firstName: snapshot.val().first_name,
          lastName: snapshot.val().last_name,
          mail: snapshot.val().gmail,
          profilePicture: snapshot.val().profile_picture,
        });
      });
  };
  render() {
    return (
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.userInfoSection}>
          <View>
            <Avatar.Image
              style={styles.Image}
              source={{ uri: this.state.profilePicture }}
              size={80}
            />
          </View>
          <View>
            <Title style={styles.title}>
              {this.state.firstName + " " + this.state.lastName}
            </Title>
            <Caption style={styles.caption}>{this.state.mail}</Caption>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff8dc",
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#fff8dc",
    paddingTop: Platform.OS === "android" ? 45 : 0,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
