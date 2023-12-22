import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {COLORS} from '../../asset/color/color';
import {translate} from '../../translation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import getUserData from '../../HOC/getUserData';

const windowWidth = Dimensions.get('window').width;

interface UserProfileProps {
  navigation: any;
  userData: {
    username: string;
    email: string;
    password: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({navigation, userData}) => {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header style={{height: '7%'}}>
        <Text style={styles.profile}>
          {translate('good_to_have')} - {userData.username}
        </Text>
      </Header>
      <View style={{marginTop: 20}}>
        <TouchableOpacity
          style={styles.myAcc}
          onPress={() => navigation.navigate('MyAcc')}>
          <Text
            style={{
              color: COLORS.dark_border,
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {translate('my_account')}
          </Text>
          <MaterialIcons
            name="arrow-right"
            size={22}
            color={COLORS.dark_border}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logOut} onPress={handleLogout}>
        <Text
          style={{
            color: COLORS.dark_border,
            fontWeight: 'bold',
            fontSize: 15,
          }}>
          {translate('log_out')}
        </Text>
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
    marginLeft: 10,
  },
  myAcc: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: windowWidth * 0.9,
    padding: 2,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logOut: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: windowWidth * 0.9,
    padding: 2,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default getUserData(UserProfile);
