import React from "react";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";

import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import PostsScreen from "./Screens/PostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";

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
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <MainStack.Screen
        options={{
          headerShown: true,
          headerTitle: "Комментарии",
          headerTitleStyle: { color: "#212121", fontSize: 17 },
          headerTitleAlign: "center",
        }}
        name="CommentsScreen"
        component={CommentsScreen}
      />
      {/* <MainStack.Screen
          options={{
            headerShown: true,

            headerTitleStyle: { color: "#212121", fontSize: 17 },
            headerTitleAlign: "center",
          }}
          name="Posts"
          component={PostsScreen}
        /> */}
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
      <ScreenStack.Screen
        options={{
          headerShown: true,
          headerTitleStyle: { color: "#212121", fontSize: 17 },
          headerTitleAlign: "center",
        }}
        name="CommentsScreen"
        component={CommentsScreen}
      />
    </ScreenStack.Navigator>

    // <Tab.Navigator
    //   screenOptions={{
    //     tabBarStyle: {
    //       height: 71,
    //       justifyContent: "center",
    //       paddingLeft: 80,
    //       paddingRight: 80,
    //     },
    //     headerTitleAlign: "center",
    //     headerStyle: { height: 88 },
    //     headerShadowVisible: {
    //       elevation: 1,
    //       backgroundColor: "#FFFFFF",
    //       shadowColor: "#000000",
    //       shadowOffset: { width: 0, height: 0.5 },
    //       shadowOpacity: 0.3,
    //       shadowRadius: 27.18,
    //     },
    //     headerTitleStyle: {
    //       fontFamily: "Roboto-Medium",
    //       marginBottom: 11,
    //       fontSize: 17,
    //       lineHeight: 22,
    //       color: "#212121",
    //     },
    //     headerRightContainerStyle: { paddingRight: 16, paddingBottom: 9 },
    //     headerLeftContainerStyle: { paddingLeft: 16, paddingBottom: 9 },
    //   }}
    // >
    //   <Tab.Screen
    //     options={{
    //       title: "Публикации",
    //       tabBarShowLabel: false,
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <AntDesign
    //           name="appstore-o"
    //           size={24}
    //           color={"rgba(33, 33, 33, 0.8)"}
    //         />
    //       ),
    //       // headerRight: () => (
    //       //   <Entypo name="log-out" size={24} color={"#BDBDBD"} />
    //       // ),
    //       headerRight: () => (
    //         <TouchableOpacity
    //           activeOpacity={0.8}
    //           // onPress={() => navigation.navigate("Register")}
    //         >
    //           <Entypo name="log-out" size={24} color={"#BDBDBD"} />
    //         </TouchableOpacity>
    //       ),
    //     }}
    //     name="PostsScreen"
    //     component={PostsScreen}
    //   />
    //   <Tab.Screen
    //     options={{
    //       title: "Создать публикацию",
    //       tabBarShowLabel: false,
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <View
    //           style={{
    //             alignItems: "center",
    //             backgroundColor: "#FF6C00",
    //             width: 70,
    //             height: 40,
    //             padding: 13.5,
    //             borderRadius: 20,
    //           }}
    //         >
    //           <Fontisto name="plus-a" size={13} color="white" />
    //         </View>
    //       ),
    //     }}
    //     name="CreatePostsScreen"
    //     component={CreatePostsScreen}
    //   />
    //   <Tab.Screen
    //     options={{
    //       title: "Публикации",
    //       tabBarShowLabel: false,
    //       tabBarIcon: ({ focused, size, color }) => (
    //         <Feather name="user" size={24} color={"rgba(33, 33, 33, 0.8)"} />
    //       ),
    //     }}
    //     name="ProfileScreen"
    //     component={ProfileScreen}
    //   />
    // </Tab.Navigator>
  );
};
