import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../asset/color/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translate} from '../../translation';

interface QuestDetailsProps {}

interface cardData {
  questDetail: {
    quest: string;
    level: string;
    type: string;
    reward: string;
    timeLimit: string;
    description: string;
    hints: string;
  };
}

const QuestDetails: React.FC<QuestDetailsProps> = () => {
  const [placeName, setPlaceName] = useState('');
  const [data, setData] = useState<cardData[]>([]);
  const [hintViewCount, setHintViewCount] = useState(0);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const placeNameValue = await AsyncStorage.getItem('placeName');
      const questDetailsValue = await AsyncStorage.getItem('questDetails');

      if (placeNameValue !== null) {
        setPlaceName(placeNameValue);
      }

      if (questDetailsValue !== null) {
        setData(JSON.parse(questDetailsValue));
      }
    } catch (error) {
      console.error('Error fetching details from AsyncStorage:', error);
    }
  };

  const questDetail = data.length > 0 ? data[0].questDetail : null;

  const handleHintPress = () => {
    if (hintViewCount < 3) {
      Alert.alert('Hint', questDetail?.hints);
      setHintViewCount(hintViewCount + 1);
    } else {
      Alert.alert('No More Hints', 'You have exhausted all hints.');
    }
  };

  const handleDelete = async () => {
    try {
      await AsyncStorage.removeItem('questDetails');
      setData([]);
    } catch (error) {
      console.error('Error deleting quest details:', error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.questTitle}>{questDetail?.quest}</Text>
        <View style={styles.icons}>
          <MaterialIcons
            name="add"
            size={24}
            color={COLORS.primary}
            onPress={() => console.log('Edit pressed')}
          />
          <MaterialIcons
            name="delete"
            size={24}
            color={COLORS.danger}
            onPress={handleDelete}
          />
        </View>
      </View>
      <Text style={styles.placeName}>{placeName}</Text>
      <View style={styles.questDetails}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.dark_myst,
              fontWeight: 'bold',
            }}>{`${translate('level')}: ${
            questDetail?.level ? questDetail?.level : translate('none')
          }`}</Text>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.info,
              fontWeight: 'bold',
            }}>{`${translate('type')}: ${
            questDetail?.type ? questDetail?.type : translate('none')
          }`}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginTop: 4,
            marginBottom: 4,
          }}>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.primary,
              fontWeight: 'bold',
            }}>{`${translate('reward')}: ${
            questDetail?.reward ? questDetail?.reward : translate('none')
          }`}</Text>
          <Text
            style={{
              fontSize: 13,
              color: COLORS.danger,
              fontWeight: 'bold',
            }}>{`${translate('time_limit')}: ${
            questDetail?.timeLimit ? questDetail?.timeLimit : translate('none')
          }`}</Text>
        </View>
        <Text
          style={{
            marginTop: 2,
            fontSize: 15,
            color: COLORS.dark_border,
          }}>{`${translate('description')}: ${
          questDetail?.description
            ? questDetail?.description
            : translate('none')
        }`}</Text>
      </View>
      <View style={styles.hintButton}>
        {hintViewCount < 3 ? (
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={24}
            color={COLORS.white}
            onPress={handleHintPress}
          />
        ) : (
          <MaterialCommunityIcons
            name="lightbulb-off-outline"
            size={24}
            color={COLORS.light_border}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  questTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  placeName: {
    marginBottom: 10,
    fontSize: 16,
  },
  questDetails: {
    marginBottom: 10,
  },
  hintButton: {
    backgroundColor: COLORS.dark_border,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
});

export default QuestDetails;
