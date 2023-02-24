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

export default function RegistrationScreen({ changeScrenn }) {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const inputHandlerLogin = (text) => setLogin(text);
  const inputHandlerEmail = (text) => setEmail(text);
  const inputHandlerPassword = (text) => setPassword(text);

  // console.log(Platform.OS);
  const passwShow = () => alert(`Your password is: ${password}`);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <View style={styles.form}>
        <View style={styles.imgUser}>
          <TouchableOpacity activeOpacity={0.8} style={styles.imgAdd}>
            <Image source={require("../assets/images/add.png")} />
          </TouchableOpacity>
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
          autoFocus
          value={login}
          onChangeText={inputHandlerLogin}
          onFocus={() => {
            setFocusedInput("login");
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
          <Text style={styles.textButton}>Зарегистрироваться</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={() => changeScrenn(0)}>
          <Text style={styles.accountText}>Уже есть аккаунт? Войти</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    // <View style={styles.container}>
    //   <ImageBackground
    //     source={require("../assets/images/PhotoBG.jpg")}
    //     resizeMode="cover"
    //     style={styles.image}
    //   >
    //     <KeyboardAvoidingView
    //       behavior={Platform.OS == "ios" ? "padding" : "height"}
    //     >
    //       <View style={styles.form}>
    //         <View style={styles.imgUser}>
    //           <Image
    //             style={styles.imgAdd}
    //             source={require("../assets/images/add.png")}
    //           />
    //         </View>

    //         <Text style={styles.titleText}>Регистрация</Text>

    //         <TextInput
    //           style={styles.input}
    //           placeholder="Логин"
    //           autoFocus
    //           value={login}
    //           onChangeText={inputHandlerLogin}
    //         />
    //         <TextInput
    //           style={styles.input}
    //           placeholder="Адрес электронной почты"
    //           value={email}
    //           onChangeText={inputHandlerEmail}
    //         />
    //         <TextInput
    //           style={styles.input}
    //           placeholder="Пароль"
    //           secureTextEntry={true}
    //           value={password}
    //           onChangeText={inputHandlerPassword}
    //         />
    //         <TouchableOpacity activeOpacity={0.8} style={styles.button}>
    //           <Text style={styles.textButton}>Зарегистрироваться</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </KeyboardAvoidingView>
    //   </ImageBackground>
    // </View>
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
  imgUser: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -50,
    // marginTop: -60,
  },
  imgAdd: {
    width: 25,
    height: 25,
    position: "absolute",
    top: 80,
    left: 107,
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
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 78,
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
