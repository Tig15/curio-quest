import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SliderComponent from '../../components/Slider';
import {COLORS} from '../../asset/color/color';
import Header from '../../components/Header';

const Home: React.FC = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Header>
        <Text style={styles.welcomeText}>Welcome to CurioQuest!</Text>
        <SliderComponent />
      </Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light_border,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: COLORS.white,
  },
});

export default Home;
