import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {COLORS} from '../../asset/color/color';
import {translate} from '../../translation';

const UserProfile = ({navigation}: any) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const userId = currentUser.uid;
          const userSnapshot = await firestore()
            .collection('users')
            .doc(userId)
            .get();

          if (userSnapshot.exists) {
            const userData = userSnapshot.data();
            setUsername(userData?.username);
          }
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <View style={styles.container}>
      <Header height="7%">
        <Text style={styles.profile}>
          {translate('adventure')} - {username}
        </Text>
      </Header>
      <TouchableOpacity onPress={() => navigation.replace('LogIn')}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light_border,
  },
  profile: {
    color: COLORS.white,
    fontSize: 17,
    alignSelf: 'flex-start',
  },
});

export default UserProfile;
