import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {COLORS} from '../../asset/color/color';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const WelcomeScreen: React.FC = ({navigation}: any) => {
  const Skip = ({...props}) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>Skip</Text>
    </TouchableOpacity>
  );

  const Next = ({...props}) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  );

  const Done = ({...props}) => (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.buttonText}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      containerStyles={styles.container}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace('Home')}
      onDone={() => navigation.replace('Home')}
      pages={[
        {
          backgroundColor: COLORS.logo_bg,
          image: (
            <Image
              source={require('../../asset/image/curioquest_logo.png')}
              resizeMode="cover"
              style={styles.image}
            />
          ),
          title: 'Welcome to CurioQuest!',
          subtitle: 'Join the adventure!',
          titleStyles: {
            fontSize: 20,
            color: COLORS.black,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          subTitleStyles: {
            fontSize: 14,
            color: COLORS.dark_border,
            textAlign: 'center',
          },
        },
        {
          backgroundColor: COLORS.dark_myst,
          image: (
            <Image
              source={require('../../asset/image/mystery.png')}
              resizeMode="cover"
              style={styles.image}
            />
          ),
          title: 'Uncover Mysteries',
          subtitle: 'Explore and Discover Hidden Treasures',
          titleStyles: {
            fontSize: 20,
            color: COLORS.black,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          subTitleStyles: {
            fontSize: 14,
            color: COLORS.dark_border,
            textAlign: 'center',
          },
        },
        {
          backgroundColor: COLORS.light_myst,
          image: (
            <Image
              source={require('../../asset/image/adventure.png')}
              resizeMode="cover"
              style={styles.image}
            />
          ),
          title: 'Embark on Adventures',
          subtitle: 'Start Your Quest Journey Today!',
          titleStyles: {
            fontSize: 20,
            color: COLORS.black,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          subTitleStyles: {
            fontSize: 14,
            color: COLORS.dark_border,
            textAlign: 'center',
          },
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  buttonText: {
    color: COLORS.black,
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: width * 0.6,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  startButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
