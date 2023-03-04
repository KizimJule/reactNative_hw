import React, { useState, useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

import { Feather } from "@expo/vector-icons";

import {
  StyleSheet,
  ImageBackground,
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
    location: "Ukraine",
    comments: 8,
    likes: 153,
  },
  {
    id: "2",
    postImage: require("../assets/images/Sea.jpg"),
    title: "Закат на Черном море",
    location: "Ukraine",
    comments: 3,
    likes: 200,
  },
  {
    id: "3",
    postImage: require("../assets/images/Italy.jpg"),
    title: "Старый домик в Венеции",
    location: "Italy",
    comments: 50,
    likes: 200,
  },
];
export default function ProfileScreen({ navigation }) {
  const [userImg, setUserImg] = useState(1);
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
      <ImageBackground
        source={require("../assets/images/PhotoBG.jpg")}
        resizeMode="cover"
        style={{ ...styles.imageBG, width: windowWidth, height: windowHeight }}
      >
        <FlatList
          ListHeaderComponent={
            <View
              style={{
                ...styles.profile,
                marginTop: windowWidth > 500 ? 100 : 147,
                width: windowWidth,
              }}
            >
              <View
                style={{
                  ...styles.imgUserContainer,
                  left: (windowWidth - 120) / 2,
                }}
              >
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
                    style={styles.avatarImage}
                    source={require("../assets/images/UserIcon.jpg")}
                  />
                ) : null}
              </View>
              <View style={{ position: "absolute", right: 16, top: 22 }}>
                <Feather name="log-out" size={24} color={"#BDBDBD"} />
              </View>
              <View
                style={{
                  ...styles.userTitleWrapper,
                  width: windowWidth - 16 * 2,
                }}
              >
                <Text
                  style={{ ...styles.userTitle, fontFamily: "Roboto-Medium" }}
                >
                  Natali Romanova
                </Text>
              </View>
            </View>
          }
          data={posts}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.cardContainer,
                width: windowWidth,
              }}
            >
              <Image
                source={item.postImage}
                style={{
                  ...styles.cardImage,
                  width: windowWidth - 16 * 2,
                }}
              />
              <Text
                style={{
                  ...styles.cardTitle,
                  width: windowWidth - 16 * 2,
                  fontFamily: "Roboto-Medium",
                }}
              >
                {item.title}
              </Text>
              <View
                style={{ ...styles.cardThumb, width: windowWidth - 16 * 2 }}
              >
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
                      onPress={() => navigation.navigate("CommentsScreen")}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color={"#FF6C00"}
                      />
                      <Text style={styles.cardText}>{item.comments}</Text>
                    </TouchableOpacity>

                    <View style={{ ...styles.cardWrapper, marginLeft: 24 }}>
                      <Feather name="thumbs-up" size={24} color={"#FF6C00"} />
                      <Text style={styles.cardText}>{item.likes}</Text>
                    </View>
                  </View>

                  <View style={{ ...styles.cardWrapper, marginLeft: 145 }}>
                    <Feather name="map-pin" size={24} color={"#BDBDBD"} />
                    <Text style={styles.cardText}>{item.location}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
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
});
