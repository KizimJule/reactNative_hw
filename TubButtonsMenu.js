import React from "react";
import { View, TouchableOpacity } from "react-native";

//import icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PostsScreen from "./Screens/PostsScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

export const TubButtonsMenu = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 71,
          justifyContent: "center",
          paddingLeft: 80,
          paddingRight: 80,
        },
        headerTitleAlign: "center",
        headerStyle: { height: 88 },
        headerShadowVisible: {
          elevation: 1,
          backgroundColor: "#FFFFFF",
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.3,
          shadowRadius: 27.18,
        },
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          marginBottom: 11,
          fontSize: 17,
          lineHeight: 22,
          color: "#212121",
        },
        headerRightContainerStyle: { paddingRight: 16, paddingBottom: 9 },
        headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 9 },
      }}
    >
      <Tab.Screen
        options={{
          title: "Публикации",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={"rgba(33, 33, 33, 0.8)"}
            />
          ),
          headerRight: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => console.log("you press logout")}>
              <Entypo name="log-out" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <Tab.Screen
        options={{
          title: "Создать публикацию",
          headerLeft: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => console.log("you press logout")}>
              <Feather name="arrow-left" size={24} color={"#BDBDBD"} />
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                alignItems: "center",
                backgroundColor: "#FF6C00",
                width: 70,
                height: 40,
                padding: 13.5,
                borderRadius: 20,
              }}
            >
              <Fontisto name="plus-a" size={13} color="white" />
            </View>
          ),
        }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
      <Tab.Screen
        options={{
          title: "Публикации",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={24} color={"rgba(33, 33, 33, 0.8)"} />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
