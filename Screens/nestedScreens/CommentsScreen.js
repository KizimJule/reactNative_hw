import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';
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
} from 'react-native';

import db from '../../firebase/config';

export default function CommentsScreen({ navigation, route }) {
  const { postId, photo, commentsQuantity } = route.params;

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get('window').width;
      setWindowWidth(width);
      const height = Dimensions.get('window').height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener('change', onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector(state => state.auth);

  const commentHandler = comment => setComment(comment);

  const onSend = async () => {
    if (!comment.trim()) {
      Alert.alert(`Enter your comment, please`);
      return;
    }
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    db.firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .add({ comment, login, date, time });

    Alert.alert(`Your comment has been sent!`);

    setComment('');
    Keyboard.dismiss();
  };
  const getCommentsFromFirestore = async () => {
    try {
      await db
        .firestore()
        .collection('posts')
        .doc(postId)
        .collection('comments')
        .onSnapshot(data => setAllComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCommentsFromFirestore();
  }, []);
  console.log(allComments.length);
  return (
    <View style={{ ...styles.container }}>
      <FlatList
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Image
              style={{
                ...styles.cardImage,
                width: windowWidth - 16 * 2,
              }}
              source={{ uri: photo }}
            />
          </View>
        }
        contentContainerStyle={{ width: windowWidth - 16 * 2 }}
        data={allComments}
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.commentWrapper,
              width: windowWidth - 16 * 2,
            }}
          >
            {/* <Image source={{ uri: item.commentAvatar }} style={styles.commentAvatarImage} /> */}
            <View style={{ ...styles.commentTextContainer, width: windowWidth - 28 - 16 * 3 }}>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.commentDate}>
                {item.date} | {item.time}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        // ListFooterComponent={
        //   <View style={{ width: '100%', marginBottom: 32 }}>
        //     <TextInput
        //       value={comment}
        //       style={styles.input}
        //       placeholder="Комментировать..."
        //       cursorColor={'#BDBDBD'}
        //       placeholderTextColor={'#BDBDBD'}
        //       onChangeText={commentHandler}
        //     />
        //     <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        //       <FontAwesome5 name="arrow-circle-up" size={34} color={'#FF6C00'} />
        //     </TouchableOpacity>
        //   </View>
        // }
      />
      <View style={{ width: '100%', marginBottom: 12, alignItems: 'flex-end' }}>
        <TextInput
          value={comment}
          style={styles.input}
          placeholder="Комментировать..."
          cursorColor={'#BDBDBD'}
          placeholderTextColor={'#BDBDBD'}
          onChangeText={commentHandler}
        />
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <FontAwesome5 name="arrow-circle-up" size={34} color={'#FF6C00'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },
  cardImage: {
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 32,
    width: 343,
    height: 240,
  },
  commentWrapper: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  input: {
    marginTop: 7,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    width: '100%',
    height: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
  },
  sendButton: {
    position: 'absolute',
    top: 15,
    right: 8,
  },
  commentDate: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 12,
    color: '#BDBDBD',
  },
  commentImage: {
    width: '100%',
    marginBottom: 31,
    borderRadius: 8,
  },
  commentWrapper: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  textWrapper: {
    padding: 16,
    backgroundColor: '#00000008',
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  commentAvatarImage: {
    width: 28,
    height: 28,
    marginRight: 16,
    resizeMode: 'cover',
  },
  commentAvatarImage: {
    width: 28,
    height: 28,
    marginRight: 16,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  commentTextContainer: {
    padding: 16,
    backgroundColor: '#00000008',
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  commentDate: {
    marginTop: 8,
    fontSize: 10,
    lineHeight: 12,
    color: '#BDBDBD',
  },
});
