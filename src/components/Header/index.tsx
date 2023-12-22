import React from 'react';
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {COLORS} from '../../asset/color/color';

interface HeaderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Header: React.FC<HeaderProps> = ({children, style}) => {
  return <View style={[styles.header, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.dark_border,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
