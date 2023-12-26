import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import WelcomeScreen from './screen/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/appNavigator';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './firebaseConfig';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';

//appid:5fd43638-9717-4ee1-b5e8-6f720a677b36

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const App = () => {
  useEffect(() => {
    const ONESIGNAL_APP_ID = '5fd43638-9717-4ee1-b5e8-6f720a677b36';
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    OneSignal.initialize(ONESIGNAL_APP_ID);

    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });

    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
