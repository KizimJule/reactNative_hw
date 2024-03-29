import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import bd from '../firebase/config';

import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function CreatePostsScreen({ navigation }) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState(null);
  const [location, setLocation] = useState(null);
  const [nameLocation, setNameLocation] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(Camera.Constants.Type.back);

  const { userId, login } = useSelector(state => state.auth);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const keyboardHideOut = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePhoto = async () => {
    if (camera) {
      try {
        const { uri } = await camera.takePictureAsync();

        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setLocation(coords);

        setPhoto(uri);
      } catch (e) {
        if (e.message.includes("Call to function 'ExponentCamera.takePicture' has been rejected")) {
          await MediaLibrary.requestPermissionsAsync();
          await Camera.requestCameraPermissionsAsync();
          const { uri } = await camera.takePictureAsync();
          setPhoto(uri);
        } else {
          throw e;
        }
      }
    }
  };

  //загружаем фото на сервер:
  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await bd.storage().ref(`postImage/${uniquePostId}`).put(file);

    //ссылка на фото на сервере:
    const processedPhoto = await bd.storage().ref('postImage').child(uniquePostId).getDownloadURL();
    setPhoto(processedPhoto);
    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      await bd
        .firestore()
        .collection('posts')
        .add({ photo, location, title, nameLocation, userId, login });
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const addPostBtn = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
    if (!photo) return;
    const post = {
      userId,
      login,
      photo,
      location,
      title,
      nameLocation,
      commentsQuantity: 0,
      likesQuantity: 0,
      likeStatus: false,
    };

    uploadPostToServer();
    navigation.navigate('DefaultScreen', { post });
    setPhoto(null);
    setTitle(null);
    setLocation(null);
    setNameLocation(null);
  };

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const isFocused = useIsFocused();

  return (
    <TouchableWithoutFeedback onPress={keyboardHideOut}>
      <View style={styles.container}>
        {isFocused && (
          <Camera
            style={styles.camera}
            type={type}
            ref={ref => {
              setCamera(ref);
            }}
          >
            {photo && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 100,
                  height: 100,
                }}
              >
                <Image
                  source={{ uri: photo }}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </View>
            )}

            <TouchableOpacity onPress={takePhoto} style={styles.photoIcon}>
              <FontAwesome name="camera" size={24} color={'#BDBDBD'} />
            </TouchableOpacity>
          </Camera>
        )}

        {photo ? (
          <TouchableOpacity>
            <Text style={styles.addPhoto}>Редактировать фото</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Text style={styles.addPhoto}>Загрузите фото</Text>
          </TouchableOpacity>
        )}

        <View style={styles.form}>
          <TextInput
            style={{ ...styles.input, paddingLeft: 0 }}
            placeholder="Название..."
            placeholderTextColor={'#BDBDBD'}
            inputMode="text"
            value={title}
            onChangeText={value => setTitle(value)}
          />
          <View style={styles.inputBox}>
            <TouchableOpacity style={styles.inputIcon}>
              <Feather name="map-pin" size={24} color={'#BDBDBD'} />
            </TouchableOpacity>

            <TextInput
              style={{ ...styles.input, paddingLeft: 32 }}
              placeholder="Местность..."
              placeholderTextColor={'#BDBDBD'}
              inputMode="text"
              value={nameLocation}
              onChangeText={value => setNameLocation(value)}
              // onChangeText={setNameLocation}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={addPostBtn}
            style={{
              ...styles.button,
              backgroundColor: photo ? '#FF6C00' : '#F6F6F6',
            }}
          >
            <Text
              style={{
                ...styles.textButton,
                color: photo ? '#FFFFFF' : '#BDBDBD',
              }}
            >
              Опубликовать
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setPhoto(null);
              setTitle(null);
              setNameLocation(null);
              // setLocation(null);
              navigation.navigate('PostsScreen');
            }}
            style={styles.buttonGo}
          >
            <Feather name="trash-2" size={24} color={'#BDBDBD'} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
  },
  container: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  camera: {
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    marginBottom: 8,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 16,
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhoto: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#BDBDBD',
  },
  form: {
    marginTop: 40,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    marginBottom: 32,
    padding: 15,
  },
  inputBox: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    top: 18,
  },
  button: {
    borderRadius: 100,
    width: '100%',
    padding: 16,
    maxWidth: 343,
    marginBottom: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  textButton: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  buttonGo: {
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    width: 70,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
