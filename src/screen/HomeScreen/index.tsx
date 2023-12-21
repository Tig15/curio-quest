import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SliderComponent from '../../components/Slider';
import {COLORS} from '../../asset/color/color';

const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to CurioQuest!</Text>
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
  header: {
    backgroundColor: COLORS.dark_border,
    padding: 15,
    alignItems: 'center',
    height: '34%',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: COLORS.white,
  },
});

export default Header;
