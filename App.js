import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";

import { Provider } from "react-redux";

import { StyleSheet, View } from "react-native";

import { useRout } from "./router";
import { store } from "./redux/store";

import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

import db from "./firebase/config";

export default function App() {
  const [user, setUser] = useState(null);

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"), //400
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"), //700
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"), //500
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  db.auth().onAuthStateChanged((user) => {
    setUser(user);
  });

  const routing = useRout(user);

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>{routing}</NavigationContainer>

        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
