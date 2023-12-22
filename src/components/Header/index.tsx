import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../asset/color/color';

const Header: React.FC = ({children}: any) => {
  return <View style={styles.header}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.dark_border,
    padding: 15,
    alignItems: 'center',
    height: '34%',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
});

export default Header;
