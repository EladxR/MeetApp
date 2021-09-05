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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class ProfileScreen extends Component {
  state = {
    firstName: "",
    lastName: "",
    mail: "",
    profilePicture: "",
    username: "@",
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
          username: snapshot.val().username,
        });
      });
  };
  render() {
    return (
      <SafeAreaView style={styles.droidSafeArea}>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Avatar.Image
              style={styles.Image}
              source={{ uri: this.state.profilePicture }}
              size={80}
            />

            <View style={{ marginStart: 15 }}>
              <Title style={[styles.title, { marginTop: 15, marginBottom: 5 }]}>
                {this.state.firstName + " " + this.state.lastName}
              </Title>
              <Caption style={styles.caption}>{this.state.username}</Caption>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              Kolkata, India
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              +91-900000009
            </Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#777777" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>
              {this.state.mail}
            </Text>
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
    backgroundColor: "#f8f8ff",
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#f8f8ff",
    paddingTop: Platform.OS === "android" ? 55 : 0,
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
