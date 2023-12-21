import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {COLORS} from '../../asset/color/color';

//{navigation}: {navigation: any}

const WelcomeScreen: React.FC = () => {
  const Skip = ({...props}) => (
    <TouchableOpacity {...props}>
      <Text style={{color: COLORS.primary, fontSize: 16, marginRight: 15}}>
        Skip
      </Text>
    </TouchableOpacity>
  );

  const Next = ({...props}) => (
    <TouchableOpacity {...props}>
      <Text style={{color: COLORS.primary, fontSize: 16, marginRight: 15}}>
        Next
      </Text>
    </TouchableOpacity>
  );

  const Done = ({...props}) => (
    <TouchableOpacity {...props}>
      <Text style={{color: COLORS.primary, fontSize: 16, marginRight: 15}}>
        Done
      </Text>
    </TouchableOpacity>
  );

  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      //   onSkip={() => navigation.replace('Home')}
      //   onDone={() => navigation.replace('Home')}
      pages={[
        {
          backgroundColor: COLORS.logo_bg,
          image: (
            <Image source={require('../../asset/image/curioquest_logo.png')} />
          ),
          title: 'Welcome to CurioQuest!',
          subtitle: 'Join the adventure!',
        },
        {
          backgroundColor: COLORS.secondary,
          image: (
            <View style={{alignItems: 'center'}}>
              <Image source={require('../../asset/image/mystery.png')} />
              <Text style={{fontSize: 24, marginTop: 20, color: COLORS.white}}>
                Discover Hidden Treasures
              </Text>
              <Text style={{fontSize: 16, marginTop: 10, color: COLORS.white}}>
                Explore new quests and uncover mysteries!
              </Text>
            </View>
          ),
          title: 'Uncover Mysteries',
          subtitle: 'Explore and Discover Hidden Treasures',
        },
        {
          backgroundColor: COLORS.black,
          image: (
            <View style={{alignItems: 'center'}}>
              <Image source={require('../../asset/image/adventure.png')} />
              <Text style={{fontSize: 24, marginTop: 20, color: COLORS.white}}>
                Start Your Journey Now!
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                  marginTop: 10,
                }}>
                <Text style={{color: COLORS.white}}>Get Started</Text>
              </TouchableOpacity>
            </View>
          ),
          title: 'Embark on Adventures',
          subtitle: 'Start Your Quest Journey Today!',
        },
      ]}
    />
  );
};

export default WelcomeScreen;
