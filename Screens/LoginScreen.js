import React, { useState } from "react";
import { useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ changeScrenn }) {
  const [focusedInput, setFocusedInput] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const keyboardHide = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
    if (!state.email || !state.password) {
      return alert("Все поля должны быть заполнены!");
    }
    console.log(state);
    setState(initialState);
  };
  const keyboardHideOut = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHideOut}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={{ ...styles.form, marginBottom: showKeyboard ? -250 : 0 }}>
          <Text style={styles.titleText}>Войти</Text>

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
            <Text style={styles.textButton}>Войти</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} onPress={() => changeScrenn(0)}>
            <Text style={styles.accountText}>
              Нет аккаунта? Зарегистрироваться
            </Text>
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
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
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
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 132,
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
});
