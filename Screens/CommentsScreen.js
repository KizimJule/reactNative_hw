import React, { useState, useEffect } from "react";

import { FontAwesome5 } from "@expo/vector-icons";

import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";

const POST_COMMENT = [
  {
    id: "2",
    postImage: require("../assets/images/Sea.jpg"),
    title: "Закат на Черном море",
    location: "Ukraine",
    comments: 3,
    likes: 200,
    commentsTotal: 3,
    comments: [
      {
        id: "1",
        userAvatar: require("../assets/images/Ellipse.png"),
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        data: "09 июня, 2020",
        time: "08:40",
      },
      {
        id: "2",
        userAvatar: require("../assets/images/UserIcon.jpg"),
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        data: "09 июня, 2020",
        time: "04:14",
      },
      {
        id: "3",
        userAvatar: require("../assets/images/Ellipse.png"),
        text: "Thank you! That was very helpful!.",
        data: "09 июня, 2020",
        time: "09:20",
      },
    ],
  },
];

export default function CommentsScreen({ navigation }) {
  const [posts, setPosts] = useState(POST_COMMENT);

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
  const [comment, setComment] = useState("");

  const commentHandler = (comment) => setComment(comment);

  const onSend = () => {
    if (!comment.trim()) {
      Alert.alert(`Enter your comment, please`);
      return;
    }
    Alert.alert(`Your comment has been sent!`);
    console.log(comment);
    setComment("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Image
            style={{
              ...styles.cardImage,
              width: windowWidth - 16 * 2,
            }}
            // source={item.postImage}
            source={require("../assets/images/Sea.jpg")}
          />
        }
        contentContainerStyle={{ width: windowWidth - 16 * 2 }}
        data={posts.comments}
        renderItem={({ item }) => (
          <Text>ddddddddd</Text>
          // <View
          //   style={{
          //     width: windowWidth,
          //   }}
          // >
          //   <View>
          //     <View style={{ width: 200, height: 60 }}>
          //       <Image
          //         source={item.avatar}
          //         style={{
          //           ...styles.cardImage,
          //           width: windowWidth - 16 * 2,
          //         }}
          //       />
          //       <Image
          //         style={{ width: 200, height: 60 }}
          //         source={item.avatar}
          //       />
          //       <Text>dddd</Text>
          //     </View>
          //   </View>
          // </View>
        )}
        ListFooterComponent={
          <View style={{ width: "100%", marginBottom: 32 }}>
            <TextInput
              value={comment}
              style={styles.input}
              placeholder="Комментировать..."
              cursorColor={"#BDBDBD"}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={commentHandler}
            />
            <TouchableOpacity style={styles.sendButton} onPress={onSend}>
              <FontAwesome5
                name="arrow-circle-up"
                size={34}
                color={"#FF6C00"}
              />
            </TouchableOpacity>
          </View>
        }
        // contentContainerStyle={{
        //   flexGrow: 1,
        //   alignItems: "center",

        //   borderTopLeftRadius: 25,
        //   borderTopRightRadius: 25,
        // }}
        // showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  cardImage: {
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    marginTop: 7,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  sendButton: {
    position: "absolute",
    top: 15,
    right: 8,
  },

  commentImage: {
    width: "100%",
    marginBottom: 31,
    borderRadius: 8,
  },
  commentWrapper: {
    flexDirection: "row",
    marginBottom: 24,
  },
  textWrapper: {
    padding: 16,
    backgroundColor: "#00000008",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  commentAvatarImage: {
    width: 28,
    height: 28,
    marginRight: 16,
    resizeMode: "cover",
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
  commentDate: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
});
