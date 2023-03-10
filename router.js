import React from "react";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";

import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PostsScreen from "./Screens/PostsScreen";

import { createStackNavigator } from "@react-navigation/stack";
const MainStack = createStackNavigator();
const ScreenStack = createStackNavigator();

export const useRout = (isAuth) => {
  return isAuth ? (
    <MainStack.Navigator initialRouteName="Login">
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <MainStack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={RegistrationScreen}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
          headerTitle: "Публикации",
          headerTitleStyle: { color: "#212121", fontSize: 17 },
          headerTitleAlign: "center",
        }}
        name="Home"
        component={Home}
      />
    </MainStack.Navigator>
  ) : (
    <ScreenStack.Navigator>
      <ScreenStack.Screen
        options={{ headerShown: true }}
        name="Home"
        component={Home}
      />
      <ScreenStack.Screen
        options={{ headerShown: true }}
        name="Posts"
        component={PostsScreen}
      />
      <ScreenStack.Screen
        options={{ headerShown: true }}
        name="CreatePostsScreen"
        component={CreatePostsScreen}
      />
    </ScreenStack.Navigator>
  );
};
