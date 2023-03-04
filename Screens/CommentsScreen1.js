import React, { useState, useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

import { Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const POSTS = [
  {
    id: "1",
    postImage: require("../assets/images/Forest.jpg"),
    title: "Лес",
    location: "Ivano-Frankivs'k Region, Ukraine",
    comments: 8,
    likes: 153,
    userAvatar: require("../assets/images/Ellipse.png"),
    text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    data: "09 июня, 2020",
    time: "08:40",
  },
  {
    id: "2",
    postImage: require("../assets/images/Sea.jpg"),
    title: "Закат на Черном море",
    location: "Ukraine",
    comments: 3,
    likes: 200,
    userAvatar: require("../assets/images/UserIcon.jpg"),
    text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    data: "09 июня, 2020",
    time: "04:14",
  },
  {
    id: "3",
    postImage: require("../assets/images/Italy.jpg"),
    title: "Старый домик в Венеции",
    location: "Italy",
    comments: 50,
    likes: 200,
    userAvatar: require("../assets/images/Ellipse.png"),
    text: "Thank you! That was very helpful!.",
    data: "09 июня, 2020",
    time: "09:20",
  },
];
export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState(POSTS);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.userSection}>
            <Image
              style={{
                ...styles.cardImage,
                width: windowWidth - 16 * 2,
              }}
              // source={item.postImage}
              source={require("../assets/images/Sea.jpg")}
            />
          </View>
        }
        data={posts}
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.cardContainer,
              width: windowWidth,
              paddingLeft: 16,
              paddingRight: 16,
              flexDirection: "column",
            }}
          >
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={item.userAvatar}
                style={{
                  ...styles.cardImage,
                  width: 28,
                  height: 28,
                  marginRight: 8,
                }}
              />
              <View
                style={{
                  width: 200,
                }}
              >
                <Text
                  style={{
                    ...styles.cardTitle,
                    width: windowWidth - 16 * 2,
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            </View>

            {/* <View style={{ ...styles.cardThumb, width: windowWidth - 16 * 2 }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={styles.cardWrapper}
                    // onPress={() => navigation.navigate("CommentsScreen")}
                  >
                    <Feather
                      name="message-circle"
                      size={24}
                      color={"#BDBDBD"}
                    />
                    <Text style={styles.cardText}>{item.comments}</Text>
                  </TouchableOpacity>

                  <View style={{ ...styles.cardWrapper, marginLeft: 56 }}>
                    <Feather name="map-pin" size={24} color={"#BDBDBD"} />
                    <Text style={styles.cardText}>{item.location}</Text>
                  </View>
                </View>
              </View>
            </View> */}
          </View>
        )}
        keyExtractor={(item) => item.id}
        // contentContainerStyle={{
        //   flexGrow: 1,
        //   alignItems: "center",

        //   borderTopLeftRadius: 25,
        //   borderTopRightRadius: 25,
        // }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  userContainer: {
    flex: 1,
    marginVertical: 32,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  imgUserContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    // marginRight: 8,
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
  profile: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imgUserContainer: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  userTitleWrapper: {
    alignItems: "center",
    marginTop: 92,
    marginBottom: 32,
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
  userTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  cardContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  cardImage: {
    resizeMode: "cover",
    borderRadius: 8,
    width: 28,
    height: 28,
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  cardThumb: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 35,
  },
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  userSection: {
    paddingLeft: 16,
    marginVertical: 32,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: "cover",
  },
  userInfo: {
    marginLeft: 8,
  },
  textUserName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 13,
    lineHeight: 15,
  },
  textUserEmail: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    opacity: 0.8,
    fontSize: 11,
    lineHeight: 13,
  },
  cardImage: {
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 32,
  },
});
