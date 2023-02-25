import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";

import React, { useState } from "react";

export default function App() {
  const [activeScreen, setActiveScreen] = useState(0);
  const changeScrennFunc = (value) => {
    setActiveScreen(value);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("./assets/images/PhotoBG.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          {activeScreen === 0 ? (
            <RegistrationScreen changeScrenn={changeScrennFunc} />
          ) : (
            <LoginScreen changeScrenn={changeScrennFunc} />
          )}
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

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
