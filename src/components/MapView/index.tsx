import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import {COLORS} from '../../asset/color/color';
import QuestModal from '../QuestModal';

interface MarkerData {
  id: string;
  coordinates: {latitude: number; longitude: number};
}

const MapViews = () => {
  const [mapReady, setMapReady] = useState(false);
  const [questModalVisible, setQuestModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<null | {
    latitude: number;
    longitude: number;
  }>(null);
  const [locationMarkers, setLocationMarkers] = useState<MarkerData[]>([]);
  const [questMarkers, setQuestMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    loadMarkersFromStorage();
  }, []);

  useEffect(() => {
    saveMarkersToStorage();
  }, [locationMarkers, questMarkers]);

  const loadMarkersFromStorage = async () => {
    try {
      const locationData = await AsyncStorage.getItem('locationMarkers');
      const questData = await AsyncStorage.getItem('questMarkers');

      if (locationData !== null) {
        setLocationMarkers(JSON.parse(locationData));
      }
      if (questData !== null) {
        setQuestMarkers(JSON.parse(questData));
      }
    } catch (error) {
      console.error('Error loading markers from AsyncStorage:', error);
    }
  };

  const saveMarkersToStorage = async () => {
    try {
      await AsyncStorage.setItem(
        'locationMarkers',
        JSON.stringify(locationMarkers),
      );
      await AsyncStorage.setItem('questMarkers', JSON.stringify(questMarkers));
    } catch (error) {
      console.error('Error saving markers to AsyncStorage:', error);
    }
  };

  const handleLocationPress = (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    const newLocationMarker: MarkerData = {
      id: `loc_${Date.now()}`,
      coordinates: {latitude, longitude},
    };
    setLocationMarkers([...locationMarkers, newLocationMarker]);
    setQuestModalVisible(true);
  };

  const handleQuestPress = (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    const newQuestMarker: MarkerData = {
      id: `quest_${Date.now()}`,
      coordinates: {latitude, longitude},
    };
    setQuestMarkers([...questMarkers, newQuestMarker]);
  };

  useEffect(() => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      if (result !== 'granted') {
        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
          permissionStatus => {
            if (permissionStatus === 'granted') {
              setMapReady(true);
            }
          },
        );
      } else {
        setMapReady(true);
      }
    });
  }, []);

  const handleSaveQuest = (details: any) => {
    console.log('Quest details:', details);

    const {quest, level, type} = details;

    const {latitude, longitude} = selectedLocation || {};

    if (latitude !== undefined && longitude !== undefined) {
      const newQuestMarker: MarkerData = {
        id: `quest_${Date.now()}`,
        coordinates: {latitude, longitude},
        questDetail: {quest, level, type},
      };

      setQuestMarkers([...questMarkers, newQuestMarker]);
    }
  };

  return (
    <View style={styles.container}>
      {mapReady && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 40.7128,
            longitude: -74.006,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={true}
          followsUserLocation={true}
          onPress={handleLocationPress}>
          {locationMarkers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinates}
              title="Location Marker"
              pinColor="red"
            />
          ))}
          {questMarkers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinates}
              title="Quest Marker"
              pinColor="blue"
            />
          ))}
          {selectedLocation && (
            <QuestModal
              visible={questModalVisible}
              onSave={handleSaveQuest}
              onClose={() => setQuestModalVisible(false)}
            />
          )}
        </MapView>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleQuestPress}>
        <Text style={{color: COLORS.white}}>Add Quest</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  addButton: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 5,
    right: 20,
  },
});

export default MapViews;
