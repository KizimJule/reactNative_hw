import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as SplashScreen from 'expo-splash-screen';

import { Feather } from '@expo/vector-icons';

import db from '../../firebase/config';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Message,
} from 'react-native';

export default function DefaultScreenPosts({ navigation, route }) {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
  const [photo, setPhoto] = useState([]);

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

  const getDataFromFirestore = async () => {
    try {
      await db
        .firestore()
        .collection('posts')
        .onSnapshot(data => setPhoto(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataFromFirestore();
  }, []);

  const { login, email, avatarImage } = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.userSection}>
            <Image style={styles.avatarImage} source={{ uri: avatarImage }} />
            <View style={styles.userInfo}>
              <Text style={styles.textUserName}>{login}</Text>
              <Text style={styles.textUserEmail}>{email}</Text>
            </View>
          </View>
        }
        data={photo}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              ...styles.cardContainer,
              width: windowWidth,
              marginBottom: 91,
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{
                ...styles.cardImage,
                width: windowWidth - 16 * 2,
              }}
            />

            <Text
              style={{
                ...styles.cardTitle,
                width: windowWidth - 16 * 2,
              }}
            >
              {item.title}
            </Text>

            <View style={{ ...styles.cardThumb, width: windowWidth - 16 * 2 }}>
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TouchableOpacity
                    style={styles.cardWrapper}
                    onPress={() =>
                      navigation.navigate('CommentsScreen', {
                        postId: item.id,
                        photo: item.photo,
                        commentsQuantity: item.commentsQuantity,
                        avatarImage,
                      })
                    }
                  >
                    <Feather name="message-circle" size={24} color={'#BDBDBD'} />
                    <Text style={styles.cardText}>{item.commentsQuantity}</Text>
                  </TouchableOpacity>

                  <View style={{ ...styles.cardWrapper, marginLeft: 56 }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('MapScreen', {
                          latitude: item.location.latitude,
                          longitude: item.location.longitude,
                        })
                      }
                    >
                      <Feather name="map-pin" size={24} color={'#BDBDBD'} />
                    </TouchableOpacity>

                    <Text style={styles.cardText}>{item.nameLocation}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  userContainer: {
    flex: 1,
    marginVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  imgUserContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  imgUser: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  userLogin: {
    fontFamily: 'Roboto-Bold',
    fontSize: 13,
  },
  userMail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
  },
  profile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },

  imgUserContainer: {
    position: 'absolute',
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  userTitleWrapper: {
    alignItems: 'center',
    marginTop: 92,
    marginBottom: 32,
  },
  imgAdd: {
    position: 'absolute',
    top: 80,
    left: 107,
    zIndex: 100,
  },
  imgDel: {
    position: 'absolute',
    top: 75,
    left: 102,
    zIndex: 100,
  },
  userTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    color: '#212121',
    textAlign: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  cardContainer: {
    flex: 1,
    width: 343,
    height: 240,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cardImage: {
    resizeMode: 'cover',
    borderRadius: 8,
    width: 343,
    height: 240,
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
  },
  cardThumb: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 35,
  },
  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 4,
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',
  },
  userSection: {
    paddingLeft: 16,
    marginVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  userInfo: {
    marginLeft: 8,
  },
  textUserName: {
    fontFamily: 'Roboto-Bold',
    color: '#212121',
    fontSize: 13,
    lineHeight: 15,
  },
  textUserEmail: {
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    opacity: 0.8,
    fontSize: 11,
    lineHeight: 13,
  },
});
