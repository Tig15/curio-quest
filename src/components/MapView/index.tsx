import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapViews = () => {
  const [markers, setMarkers] = useState([
    {
      id: 1,
      title: 'Quest 1',
      coordinates: {latitude: 37.78825, longitude: -122.4324},
    },
  ]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={marker.coordinates}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapViews;
