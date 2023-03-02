import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function CreatePostsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <View style={styles.photoIcon}>
          <FontAwesome name="camera" size={24} color={"#BDBDBD"} />
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.addPhoto}>Загрузите фото</Text>
      </TouchableOpacity>

      <View style={styles.form}>
        <TextInput
          style={{ ...styles.input, paddingLeft: 0 }}
          placeholder="Название..."
          placeholderTextColor={"#BDBDBD"}
          inputMode="text"
        />
        <View style={styles.inputBox}>
          <View style={styles.inputIcon}>
            <Feather name="map-pin" size={24} color={"#BDBDBD"} />
          </View>

          <TextInput
            style={{ ...styles.input, paddingLeft: 32 }}
            placeholder="Местность..."
            placeholderTextColor={"#BDBDBD"}
            inputMode="text"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={}
          style={styles.button}
        >
          <Text style={styles.textButton}>Опубликовать</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={}
          style={styles.buttonGo}
        >
          <Feather name="trash-2" size={24} color={"#BDBDBD"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  contentBox: {
    height: 240,
    width: "100%",
    maxWidth: 343,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addPhoto: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
  form: {
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 20,
    padding: 15,
  },
  inputBox: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    top: 18,
  },
  button: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    width: "100%",
    padding: 16,
    maxWidth: 343,
    marginBottom: 80,
  },
  textButton: {
    textAlign: "center",
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  buttonGo: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
