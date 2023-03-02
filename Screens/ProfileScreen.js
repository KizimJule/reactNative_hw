import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const COURSES = [
  {
    id: "45k6-j54k-4jth",
    title: "HTML",
  },
  {
    id: "4116-jfk5-43rh",
    title: "JavaScript",
  },
  {
    id: "4d16-5tt5-4j55",
    title: "React",
  },
  {
    id: "LG16-ant5-0J25",
    title: "React Native",
  },
];
export default function ProfileScreen() {
  const [userImg, setUserImg] = useState(1);
  const [courses, setCourses] = useState(COURSES);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/PhotoBG.jpg")}
        resizeMode="cover"
        style={styles.imageBG}
      >
        <View style={styles.profile}>
          <View style={styles.imgUserContainer}>
            <TouchableOpacity
              onPress={() => {
                setUserImg(1);
              }}
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

            {userImg === 1 ? (
              <Image
                style={styles.imgUser}
                source={require("../assets/images/UserIcon.jpg")}
              />
            ) : null}
          </View>

          <Text style={styles.textTitle}>Natali Romanova</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageBG: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  profile: {
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
  textTitle: {
    marginTop: 92,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
});
