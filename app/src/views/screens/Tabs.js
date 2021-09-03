import React, { Component, Children } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "../screens/FeedScreen";
import FindScreen from "../screens/FindScreen";
import PostScreen from "../screens/PostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingScreen from "../screens/SettingScreen";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: "center",
      alignItems: "center",
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#e32f45",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);
const Tabs = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 15,
            height: 90,
            backgroundColor: "#ffffff",
            ...styles.shadow,
          },
        }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../../assests/icons/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    //tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  {" "}
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Find"
          component={FindScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../../assests/icons/find.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    //tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  {" "}
                  Find
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../assests/icons/plus.png")}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: "#fff",
                }}
              />
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../../assests/icons/settings.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  {" "}
                  Settings
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: 10,
                }}
              >
                <Image
                  source={require("../../assests/icons/profile.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    //tintColor: focused ? "#e32f45" : "#748c94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#e32f45" : "#748c94",
                    fontSize: 12,
                  }}
                >
                  {" "}
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
