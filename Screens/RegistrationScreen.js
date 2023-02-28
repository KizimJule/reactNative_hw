import React, { useState } from "react";

// import * as ImagePicker from "expo-image-picker";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  // ImageViewer,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ changeScrenn }) {
  const [focusedInput, setFocusedInput] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  // const [selectedImage, setSelectedImage] = useState(null);

  const showPasswordHandler = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };
  const keyboardHide = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();

    if (state.login === "" || state.email === "" || state.password === "") {
      return alert("Все поля должны быть заполнены!");
    }

    console.log(state);
    setState(initialState);
  };
  const keyboardHideOut = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  // const pickImageAsync = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setSelectedImage(result.assets[0].uri);
  //   } else {
  //     alert("You did not select any image.");
  //   }
  // };
  // const PlaceholderImage = require("../assets/images/UserIcon.jpg");

  return (
    <TouchableWithoutFeedback onPress={keyboardHideOut}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={{ ...styles.form, marginBottom: showKeyboard ? -192 : 0 }}>
          <View style={styles.imgUserContainer}>
            <TouchableOpacity
              onPress={() => {
                setUserImg(1);
              }}
              // onPress={pickImageAsync}
              activeOpacity={0.8}
              style={{
                ...styles.imgAdd,
                display: userImg === 1 ? "none" : "flex",
              }}
            >
              <Image
                width={25}
                height={25}
                source={require("../assets/images/add.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setUserImg(null);
              }}
              activeOpacity={0.8}
              style={{
                ...styles.imgDel,
                display: userImg === null ? "none" : "flex",
              }}
            >
              <Image
                width={25}
                height={25}
                source={require("../assets/images/del.png")}
              />
            </TouchableOpacity>
            {/* <ImageViewer
              style={styles.imgUser}
              placeholderImageSource={PlaceholderImage }
              selectedImage={selectedImage}
            /> */}
            {userImg === 1 ? (
              <Image
                style={styles.imgUser}
                source={require("../assets/images/UserIcon.jpg")}
              />
            ) : null}
          </View>

          <Text style={styles.titleText}>Регистрация</Text>
          <TextInput
            style={{
              ...styles.input,
              borderColor: focusedInput === "login" ? "#ff6c00" : "#e8e8e8",
            }}
            placeholder="Логин"
            placeholderTextColor={"#BDBDBD"}
            inputMode="text"
            value={state.login}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, login: value }))
            }
            onFocus={() => {
              setFocusedInput("login");
              setShowKeyboard(true);
            }}
            onBlur={() => setFocusedInput(null)}
          />
          <TextInput
            style={{
              ...styles.input,
              borderColor: focusedInput === "email" ? "#ff6c00" : "#e8e8e8",
            }}
            placeholder="Адрес электронной почты"
            placeholderTextColor={"#BDBDBD"}
            inputMode="email"
            value={state.email}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, email: value }))
            }
            onFocus={() => {
              setFocusedInput("email");
              setShowKeyboard(true);
            }}
            onBlur={() => setFocusedInput(null)}
          />
          <View style={styles.inputPasswContainer}>
            <TextInput
              style={{
                ...styles.input,
                borderColor:
                  focusedInput === "password" ? "#ff6c00" : "#e8e8e8",
              }}
              placeholder="Пароль"
              placeholderTextColor={"#BDBDBD"}
              secureTextEntry={!showPassword}
              value={state.password}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              onFocus={() => {
                setFocusedInput("password");
                setShowKeyboard(true);
              }}
              onBlur={() => {
                setFocusedInput(null);
              }}
            />
            <TouchableOpacity
              style={styles.passwShow}
              activeOpacity={0.8}
              onPress={showPasswordHandler}
            >
              <Text style={styles.passwShowText}>Показать</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={keyboardHide}
            style={styles.button}
          >
            <Text style={styles.textButton}>Зарегистрироваться</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => changeScrenn(1)}>
            <Text style={styles.accountText}>Уже есть аккаунт? Войти</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    zIndex: 200,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imgUserContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -50,
  },
  imgAdd: {
    position: "absolute",
    top: 80,
    left: 107,
    zIndex: 100,
  },
  imgDel: {
    position: "absolute",
    top: 75,
    left: 102,
    zIndex: 100,
  },
  form: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 78,
  },
  titleText: {
    fontWeight: "500",
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginBottom: 33,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    width: "100%",
    color: "#212121",
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    maxWidth: 343,
    justifyContent: "center",
  },
  passwShow: {
    top: -56,
    left: 124,
  },
  passwShowText: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 18.75,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: "100%",
    padding: 16,
    marginTop: 27,
    marginBottom: 16,
    maxWidth: 343,
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  accountText: {
    color: "#1B4371",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  inputPasswContainer: {
    width: "100%",
    position: "relative",
    alignItems: "center",
  },
  imgUser: {
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
});
