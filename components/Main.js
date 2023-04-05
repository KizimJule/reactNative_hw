import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { useRout } from '../router';

import { authStateChangeUser } from '../redux/auth/authOperation';

const Main = () => {
  const { stateChange } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRout(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
export default Main;
