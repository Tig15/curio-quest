import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import WelcomeScreen from './screen/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/appNavigator';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './firebaseConfig';
import {LogLevel, OneSignal} from 'react-native-onesignal';

//appid:5fd43638-9717-4ee1-b5e8-6f720a677b36

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const App = () => {
  useEffect(() => {
    const oneSignal_App_Id = '5fd43638-9717-4ee1-b5e8-6f720a677b36';
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    OneSignal.initialize(oneSignal_App_Id);

    OneSignal.Notifications.requestPermission(true);

    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
