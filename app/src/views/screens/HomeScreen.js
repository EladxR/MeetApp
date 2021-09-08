import React, { Component } from "react";
import { Button } from "react-native-paper";
import Tabs from "./Tabs";

class HomeScreen extends Component {
  render() {
    console.log("Home in home screen");
    return (
      <Tabs onLogOut={this.props.onLogOut}>
        <Button title="sign out"></Button>
      </Tabs>
    );
  }
}

export default HomeScreen;
