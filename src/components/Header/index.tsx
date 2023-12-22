import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../asset/color/color';

interface HeaderProps {
  children: React.ReactNode;
  height: any;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
}

const Header: React.FC<HeaderProps> = ({
  children,
  height,
  borderBottomLeftRadius,
  borderBottomRightRadius,
}) => {
  return (
    <View
      style={[
        styles.header,
        {
          height: height,
          borderBottomLeftRadius: borderBottomLeftRadius,
          borderBottomRightRadius: borderBottomRightRadius,
        },
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.dark_border,
    padding: 15,
    alignItems: 'center',
  },
});

export default Header;
