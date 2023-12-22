import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SliderComponent from '../../components/Slider';
import {COLORS} from '../../asset/color/color';
import Header from '../../components/Header';
import {translate} from '../../translation';

const Home: React.FC = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Header
        height="6%"
        borderBottomLeftRadius={12}
        borderBottomRightRadius={12}>
        <Text style={styles.welcomeText}>{translate('welcome')}</Text>
      </Header>
      <View style={{height: '30%'}}>
        <SliderComponent />
      </View>
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
