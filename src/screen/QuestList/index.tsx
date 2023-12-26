import {View, Text, ScrollView} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import QuestDetails from '../../components/QuestDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import {useFocusEffect} from '@react-navigation/native';
import {translate} from '../../translation';
import {COLORS} from '../../asset/color/color';

const QuestList = () => {
  const [questDetailsAvailable, setQuestDetailsAvailable] = useState(false);

  useEffect(() => {
    checkQuestDetails();
  }, []);

  useFocusEffect(
    useCallback(() => {
      checkQuestDetails();
    }, []),
  );

  const checkQuestDetails = async () => {
    try {
      const questDetailsValue = await AsyncStorage.getItem('questDetails');
      if (questDetailsValue !== null) {
        setQuestDetailsAvailable(true);
      }
    } catch (error) {
      console.error('Error fetching quest details:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header style={{height: '6%'}}>
        <Text
          style={{
            fontSize: 19,
            color: COLORS.white,
            alignSelf: 'flex-start',
            marginLeft: 10,
          }}>
          {translate('quest_list')}
        </Text>
      </Header>

      <ScrollView style={{flex: 1}}>
        {questDetailsAvailable && <QuestDetails />}
      </ScrollView>
    </View>
  );
};

export default QuestList;
