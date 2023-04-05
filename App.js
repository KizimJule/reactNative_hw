import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';

import { Provider } from 'react-redux';

import { StyleSheet, View } from 'react-native';

import { store } from './redux/store';
import Main from './components/Main';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'), //400
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'), //700
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'), //500
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Main />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
