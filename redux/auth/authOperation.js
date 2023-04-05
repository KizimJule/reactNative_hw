import db from '../../firebase/config';

import { authSlice } from './authReducer';

//вход
const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
      });

      const { displayName, uid } = await db.auth().currentUser;

      const userUpdateProfile = {
        login: displayName,
        userId: uid,
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
      };

      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    }
  });
};

export { authSignInUser, authSignUpUser, authSignOutUser, authStateChangeUser };
