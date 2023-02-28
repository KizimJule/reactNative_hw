import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  // Dimensions,
} from "react-native";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

import React, { useState } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);

  const changeScrennFunc = (value) => {
    setActiveScreen(value);
  };

  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("./assets/images/PhotoBG.jpg")}
          resizeMode="cover"
          style={styles.imageBG}
        >
          {activeScreen === 0 ? (
            <RegistrationScreen changeScrenn={changeScrennFunc} />
          ) : (
            <LoginScreen changeScrenn={changeScrennFunc} />
          )}
        </ImageBackground>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
