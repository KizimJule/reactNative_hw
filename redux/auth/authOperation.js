import db from '../../firebase/config';

import { authSlice } from './authReducer';
import { auth } from '../../firebase/config';
//вход
const authSignUpUser =
  ({ login, email, password, avatarImage }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
        photoURL: avatarImage,
      });

      const { displayName, uid, photoURL } = await db.auth().currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        email,
        avatarImage: photoURL,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));

      console.log('user_reg', user);
    } catch (error) {
      console.log('error_authSignUpUser', error.message);
      console.log(error.message);
    }
  };

//регистрация(логин)
const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);

      console.log('user_login', user);
    } catch (error) {
      console.log('error_authSignInUser', error.message);
      console.log(error.message);
    }
  };

//выход
const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();

  dispatch(authSlice.actions.authSignOut());
};

// проверка авторизации пользователя
const authStateChangeUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged(user => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email: user.email,
        avatarImage: user.photoURL,
      };

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
