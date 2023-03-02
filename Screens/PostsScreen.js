import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function PostsScreen({ navigation, route }) {
  // const { email } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.userContainer}>
          <View style={styles.imgUserContainer}>
            <Image
              style={styles.imgUser}
              source={require("../assets/images/UserIcon.jpg")}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userLogin}>Natali Romanova</Text>
            <Text style={styles.userMail}>email@example.com</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.accountText}>
            Этой кнопки нет в макете. Нажать для теста возврата в регистрацию
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  main: {
    flex: 10,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imgUserContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginRight: 8,
  },
  imgUser: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  userLogin: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
  },
  userMail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
  },
  btn: {
    marginTop: 400,
    width: 300,
    height: 60,
    padding: 10,
    backgroundColor: "#FF6C00",
  },
});
