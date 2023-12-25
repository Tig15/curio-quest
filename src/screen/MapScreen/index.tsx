import {View, Text} from 'react-native';
import React from 'react';
import MapViews from '../../components/MapView';

const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
      <MapViews />
    </View>
  );
};

export default MapScreen;
