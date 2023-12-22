import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Header';
import {COLORS} from '../../asset/color/color';
import {translate} from '../../translation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomModal from '../BottomModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import getUserData from '../../HOC/getUserData';

const windowWidth = Dimensions.get('window').width;

interface MyAccountProps {
  navigation: any;
  userData: {
    username: string;
    email: string;
    password: string;
  };
}

const MyAccount: React.FC<MyAccountProps> = ({navigation, userData}) => {
  const [openModal, setOpenModal] = useState({
    email: false,
    password: false,
  });

  const toggleEmailModal = () => {
    setOpenModal(prevState => ({
      ...prevState,
      email: !prevState.email,
    }));
  };

  const togglePasswordModal = () => {
    setOpenModal(prevState => ({
      ...prevState,
      password: !prevState.password,
    }));
  };

  return (
    <View style={styles.container}>
      <Header style={styles.header}>
        <Text style={styles.headTitle}>{translate('my_account')}</Text>
        <TouchableOpacity
          style={styles.arrowIcon}
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left-thin-circle-outline"
            size={24}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </Header>

      <View style={{marginTop: 20, gap: 20}}>
        <TouchableOpacity style={styles.myAcc} onPress={toggleEmailModal}>
          <Text style={styles.sectionText}>{translate('check_email')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.myAcc} onPress={togglePasswordModal}>
          <Text style={styles.sectionText}>{translate('check_password')}</Text>
        </TouchableOpacity>
      </View>

      <BottomModal modalVisible={openModal.email}>
        <View style={styles.modalEmailContent}>
          <View style={styles.topNotch} />
          <View>
            <View style={styles.yourEmail}>
              <Text style={styles.inputText}>{translate('entered_email')}</Text>
              <TextInput
                value={userData.email}
                editable={false}
                style={styles.inputData}
              />
              <Text
                style={{
                  color: COLORS.dark_border,
                  fontSize: 10,
                }}>
                {translate('cannot_change')}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.exitModal} onPress={toggleEmailModal}>
            <MaterialCommunityIcons name="close" size={20} />
          </TouchableOpacity>
        </View>
      </BottomModal>

      <BottomModal modalVisible={openModal.password}>
        <View style={styles.modalPasswordContent}>
          <View style={styles.topNotch} />
          <View style={{gap: 20}}>
            <View style={styles.currPassword}>
              <Text style={styles.inputText}>{translate('curr_password')}</Text>
              <TextInput
                value={userData.password}
                editable={false}
                style={styles.inputData}
                secureTextEntry
              />
            </View>
            <View style={styles.currPassword}>
              <Text style={styles.inputText}>{translate('new_password')}</Text>
              <TextInput
                style={styles.inputData}
                secureTextEntry
                placeholder="Enter Your New Password"
              />
            </View>
            <View style={styles.currPassword}>
              <Text style={styles.inputText}>
                {translate('rewrite_password')}
              </Text>
              <TextInput
                style={styles.inputData}
                secureTextEntry
                placeholder="Rewrite New Password"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.exitModal}
            onPress={togglePasswordModal}>
            <MaterialCommunityIcons name="close" size={20} />
          </TouchableOpacity>
        </View>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light_border,
  },
  arrowIcon: {
    position: 'absolute',
    left: 15,
    top: 11,
  },
  header: {
    height: '6%',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  sectionText: {
    color: COLORS.dark_border,
    fontWeight: 'bold',
    fontSize: 15,
  },
  topNotch: {
    width: 40,
    height: 3,
    backgroundColor: COLORS.dark_border,
    borderRadius: 20,
    position: 'absolute',
    top: 6,
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
  modalEmailContent: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: windowWidth / 2,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalPasswordContent: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: windowWidth / 1.2,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  yourEmail: {
    width: windowWidth * 0.8,
    gap: 8,
  },
  currPassword: {
    width: windowWidth * 0.8,
    gap: 5,
  },
  inputData: {
    color: COLORS.dark_border,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
  },
  inputText: {
    color: COLORS.dark_border,
    fontWeight: 'bold',
  },
  exitModal: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
});

export default getUserData(MyAccount);
