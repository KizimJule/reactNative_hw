import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";

export default function LoginScreen({ changeScrenn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const inputHandlerEmail = (text) => setEmail(text);
  const inputHandlerPassword = (text) => setPassword(text);

  // console.log(Platform.OS);
  const passwShow = () => alert(`Your password is: ${password}`);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.form}>
        <Text style={styles.titleText}>Войти</Text>

        <TextInput
          style={{
            ...styles.input,
            borderColor: focusedInput === "email" ? "#ff6c00" : "#e8e8e8",
          }}
          placeholder="Адрес электронной почты"
          placeholderTextColor={"#BDBDBD"}
          inputMode="email"
          value={email}
          onChangeText={inputHandlerEmail}
          onFocus={() => {
            setFocusedInput("email");
          }}
          onBlur={() => setFocusedInput(null)}
        />
        <TextInput
          style={{
            ...styles.input,
            borderColor: focusedInput === "password" ? "#ff6c00" : "#e8e8e8",
          }}
          placeholder="Пароль"
          placeholderTextColor={"#BDBDBD"}
          secureTextEntry={true}
          value={password}
          onChangeText={inputHandlerPassword}
          onFocus={() => {
            setFocusedInput("password");
          }}
          onBlur={() => setFocusedInput(null)}
        />

        <TouchableOpacity
          style={styles.passwShow}
          activeOpacity={0.8}
          onPress={passwShow}
        >
          <Text style={styles.passwShowText}>Показать</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <Text style={styles.textButton}>Войти</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => changeScrenn(1)}>
          <Text style={styles.accountText}>
            Нет аккаунта? Зарегистрироваться
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  form: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
    // height: 549,
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
    fontFamily: "Roboto",
    fontWeight: "bold",
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
  },
  passwShow: {
    top: -56,
    left: 140,
  },
  passwShowText: { color: "#1B4371", fontSize: 16 },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: "100%",
    padding: 16,
    marginTop: 27,
    marginBottom: 16,
  },
  textButton: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
  accountText: {
    color: "#1B4371",
    fontSize: 16,
  },
});
