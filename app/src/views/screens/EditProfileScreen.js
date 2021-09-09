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
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import firebase from "firebase";
import { useTheme } from "@react-navigation/native";

class EditProfileScreen extends Component {
  state = {
    firstName: "",
    lastName: "",
    mail: "",
    profilePicture: "",
    username: "@",
    phoneNumber: "",
    location: "",
    degree: "",
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
          phoneNumber: snapshot.val().phoneNumber,
          location: snapshot.val().location,
          degree: snapshot.val().degree,
        });
      });
  };
  onSubmit = () => {
    console.log(this.state);
  };
  saveUserInput = (userInput, currentText) => {
    const input = userInput;
    switch (currentText) {
      case "firstName":
        this.setState({ firstName: userInput });
        break;
      case "lastName":
        this.setState({ lastName: userInput });
        break;
      case "phoneNumber":
        this.setState({ phoneNumber: userInput });
        break;
      case "location":
        this.setState({ location: userInput });
        break;
      case "degree":
        this.setState({ degree: userInput });
        break;
    }

    this.setState({ currentText: userInput });
    return input;
  };

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={styles.container}>
        <View style={{ margin: 20 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={
                    this.state.profilePicture === ""
                      ? require("../../assests/icons/profile.png")
                      : { uri: this.state.profilePicture }
                  }
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
              {this.state.username}
            </Text>
          </View>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              defaultValue={this.state.firstName}
              onChangeText={(userInput) =>
                this.saveUserInput(userInput, "firstName")
              }
              placeholder="First Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              defaultValue={this.state.lastName}
              placeholder="Last Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <Feather name="phone" color={colors.text} size={20} />
            <TextInput
              defaultValue={this.state.phoneNumber}
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="graduation-cap" color={colors.text} size={20} />
            <TextInput
              defaultValue={this.state.degree}
              placeholder="Degree"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>

          <View style={styles.action}>
            <Icon name="map-marker-outline" color={colors.text} size={20} />
            <TextInput
              defaultValue={this.state.location}
              placeholder="Location"
              placeholderTextColor="#666666"
              autoCorrect={false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
            />
          </View>
          <TouchableOpacity
            style={styles.commandButton}
            onPress={() => {
              this.onSubmit();
            }}
          >
            <Text style={styles.panelButtonTitle}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default function (props) {
  const theme = useTheme();

  return <EditProfileScreen {...props} theme={theme} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
