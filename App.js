import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ImageBackground } from "react-native";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

import React, { useState } from "react";

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const changeScrennFunc = (value) => {
    setActiveScreen(value);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/PhotoBG.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        {activeScreen === 0 ? (
          <LoginScreen changeScrenn={changeScrennFunc} />
        ) : (
          <RegistrationScreen changeScrenn={changeScrennFunc} />
        )}
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}
// cat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
