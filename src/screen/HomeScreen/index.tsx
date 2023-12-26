import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import SliderComponent from '../../components/Slider';
import {COLORS} from '../../asset/color/color';
import Header from '../../components/Header';
import {translate} from '../../translation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Home: React.FC = ({navigation}: any) => {
  // useFocusEffect()

  const handleRemove = async () => {
    try {
      await AsyncStorage.removeItem('questMarkers');
    } catch (error) {
      console.error('Error deleting quest details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        style={{
          height: '6%',
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}>
        <Text style={styles.welcomeText}>{translate('welcome')}</Text>
      </Header>
      <View style={{height: '30%'}}>
        <SliderComponent />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{
            padding: 6,
            backgroundColor: COLORS.info,
            marginLeft: 6,
            borderRadius: 6,
          }}>
          <Text style={{fontSize: 16, color: COLORS.white}}>
            {translate('check_quest_markers')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 6,
            backgroundColor: COLORS.dark_border,
            marginRight: 6,
            borderRadius: 6,
          }}
          onPress={handleRemove}>
          <Text style={{fontSize: 16, color: COLORS.light_border}}>
            {translate('remove_quest_markers')}
          </Text>
        </TouchableOpacity>
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
    marginLeft: 10,
  },
});

export default Home;
