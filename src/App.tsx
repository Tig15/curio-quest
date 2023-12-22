import {View, Text} from 'react-native';
import React from 'react';
import WelcomeScreen from './screen/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/appNavigator';
import firebase from '@react-native-firebase/app';
import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
