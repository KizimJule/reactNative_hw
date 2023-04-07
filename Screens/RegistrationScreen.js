import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';

import { useDispatch } from 'react-redux';

import { authSignUpUser } from '../redux/auth/authOperation';
import * as ImagePicker from 'expo-image-picker';

import db from '../firebase/config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function RegistrationScreen({ navigation }) {
  const [focusedInput, setFocusedInput] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const [pickedImagePath, setPickedImagePath] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

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

  const showPasswordHandler = () => {
    const toggle = showPassword ? false : true;
    setShowPassword(toggle);
  };

  const keyboardHide = async () => {
    setShowKeyboard(false);
    Keyboard.dismiss();

    if (login === '' || email === '' || password === '' || pickedImagePath === '') {
      return alert('Все поля должны быть заполнены!');
    }

    const imageRef = await uploadPhotoToServer();
    const newUser = {
      avatarImage: imageRef,
      login,
      email,
      password,
    };
    dispatch(authSignUpUser(newUser));

    setLogin('');
    setEmail('');
    setPassword('');
    setPickedImagePath('');

  };

  const downloadAvatar = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setPickedImagePath(result.assets[0].uri);
      }
    } catch (error) {
      console.log('error-message', error.message);
    }
  };

  const deleteAvatar = () => setPickedImagePath('');

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(pickedImagePath);
      const file = await response.blob();
      const storage = getStorage();
      const uniquePostId = Date.now().toString();
      const storageRef = ref(storage, `avatarImage/${uniquePostId}`);
      await uploadBytes(storageRef, file);
      const photoRef = await getDownloadURL(storageRef);
      return photoRef;
    } catch (error) {
      console.log('error-message.upload-photo', error.message);
    }
  };

  const keyboardHideOut = () => {
    setShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHideOut}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/images/PhotoBG.jpg')}
          resizeMode="cover"
          style={{
            ...styles.imageBG,
            width: windowWidth,
            height: windowHeight,
          }}
        >
          <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={{ ...styles.form, marginBottom: showKeyboard ? -192 : 0 }}>
              <View style={styles.imgUserContainer}>
                {pickedImagePath ? (
                  <>
                    <View>
                      <Image style={styles.avatarImage} source={{ uri: pickedImagePath }} />
                    </View>
                    <TouchableOpacity
                      onPress={deleteAvatar}
                      style={{
                        ...styles.imgDel,
                      }}
                    >
                      <Image width={25} height={25} source={require('../assets/images/del.png')} />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View
                    
                    ></View>
                    <TouchableOpacity
                      onPress={downloadAvatar}
                      style={{
                        ...styles.imgAdd,
                      }}
                    >
                      <Image width={25} height={25} source={require('../assets/images/add.png')} />
                    </TouchableOpacity>
                  </>
                )}

           
              </View>

              <Text style={styles.titleText}>Регистрация</Text>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: focusedInput === 'login' ? '#ff6c00' : '#e8e8e8',
                }}
                placeholder="Логин"
                placeholderTextColor={'#BDBDBD'}
                inputMode="text"
           
                value={login}
            
                onChangeText={login => setLogin(login)}
                onFocus={() => {
                  setFocusedInput('login');
                  setShowKeyboard(true);
                }}
                onBlur={() => setFocusedInput(null)}
              />
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: focusedInput === 'email' ? '#ff6c00' : '#e8e8e8',
                }}
                placeholder="Адрес электронной почты"
                placeholderTextColor={'#BDBDBD'}
                inputMode="email"
                           value={email}
                onChangeText={email => setEmail(email)}
                onFocus={() => {
                  setFocusedInput('email');
                  setShowKeyboard(true);
                }}
                onBlur={() => setFocusedInput(null)}
              />
              <View style={styles.inputPasswContainer}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: focusedInput === 'password' ? '#ff6c00' : '#e8e8e8',
                  }}
                  placeholder="Пароль"
                  placeholderTextColor={'#BDBDBD'}
                  secureTextEntry={!showPassword}
                              value={password}
                  onChangeText={password => setPassword(password)}
                  onFocus={() => {
                    setFocusedInput('password');
                    setShowKeyboard(true);
                  }}
                  onBlur={() => {
                    setFocusedInput(null);
                  }}
                />
                <TouchableOpacity
                  style={styles.passwShow}
                  activeOpacity={0.8}
                  onPress={showPasswordHandler}
                >
                  <Text style={styles.passwShowText}>Показать</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity activeOpacity={0.8} onPress={keyboardHide} style={styles.button}>
                <Text style={styles.textButton}>Зарегистрироваться</Text>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.accountText}>Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 200,
  },
  imageBG: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imgUserContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    position: 'absolute',
    top: -50,
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
  form: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 78,
  },
  titleText: {
    fontWeight: '500',
    color: '#212121',
    fontSize: 30,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
    marginBottom: 33,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 16,
    width: '100%',
    color: '#212121',
    fontSize: 16,
    backgroundColor: '#F6F6F6',
    marginBottom: 16,
    maxWidth: 343,
    justifyContent: 'center',
  },
  passwShow: {
    top: -56,
    left: 124,
  },
  passwShowText: {
    color: '#1B4371',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    lineHeight: 18.75,
  },
  button: {
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    width: '100%',
    padding: 16,
    marginTop: 27,
    marginBottom: 16,
    maxWidth: 343,
  },
  textButton: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  accountText: {
    color: '#1B4371',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  inputPasswContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  imgUser: {
    position: 'absolute',
    top: 0,
    left: 0,
    resizeMode: 'cover',
  },

  imageThumb: {
    top: -60,
    position: 'absolute',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  addButton: {
    position: 'absolute',
    top: 21,
    width: 25,
    height: 25,
  },
});
