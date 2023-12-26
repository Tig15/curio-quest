import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../asset/color/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translate} from '../../translation';

interface QuestDetailsProps {
  navigation: any;
}

interface QuestDetails {
  quest: string;
  level: string;
  type: string;
  description: string;
  reward: number;
  timeLimit: number;
  hints: string;
}

const QuestDetails: React.FC<QuestDetailsProps> = ({navigation}) => {
  const [placeName, setPlaceName] = useState('');
  const [questDetails, setQuestDetails] = useState<QuestDetails>({
    quest: '',
    level: '',
    type: '',
    description: '',
    reward: 0,
    timeLimit: 0,
    hints: '',
  });
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
        setQuestDetails(JSON.parse(questDetailsValue));
      }
    } catch (error) {
      console.error('Error fetching details from AsyncStorage:', error);
    }
  };

  const handleHintPress = () => {
    if (hintViewCount < 3) {
      Alert.alert('Hint', questDetails.hints);
      setHintViewCount(hintViewCount + 1);
    } else {
      Alert.alert('No More Hints', 'You have exhausted all hints.');
    }
  };

  const handleDelete = async () => {
    await AsyncStorage.clear();
    navigation.navigate('home');
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.questTitle}>{questDetails.quest}</Text>
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
        <Text>{`${translate('level')}: ${questDetails.level}`}</Text>
        <Text>{`${translate('type')}: ${questDetails.type}`}</Text>
        <Text>{`${translate('reward')}: ${questDetails.reward}`}</Text>
        <Text>{`${translate('time_limit')}: ${questDetails.timeLimit}`}</Text>
        <Text>{`${translate('description')}: ${
          questDetails.description
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
