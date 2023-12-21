import {View, Text} from 'react-native';
import React from 'react';
import WelcomeScreen from './screen/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './navigation/appNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
