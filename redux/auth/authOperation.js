import db from "../../firebase/config";

import { authSlice } from "./authReducer";

//вход
const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    // console.log("login, email, password", login, email, password);

    try {
      const { user } = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);

      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));

      console.log("user_reg", user);
    } catch (error) {
      console.log("error_authSignUpUser", error.message);
      console.log(error.message);
    }
  };

//регистрация(логин)
const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);

      console.log("user_login", user);
    } catch (error) {
      console.log("error_authSignInUser", error.message);
      console.log(error.message);
    }
  };

//выход
const authSignOutUser = () => async (dispatch, getState) => {};

export { authSignInUser, authSignUpUser, authSignOutUser };
