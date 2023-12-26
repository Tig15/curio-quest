import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import {COLORS} from '../../asset/color/color';
import QuestModal from '../QuestModal';
import Geolocation from '@react-native-community/geolocation';

interface MarkerData {
  id: string;
  coordinates: {latitude: number; longitude: number};
  questDetail?: {
    quest: string;
    level: string;
    type: string;
    reward: string;
    timeLimit: string;
    hints: string;
  };
}

const MapViews = () => {
  const [mapReady, setMapReady] = useState(false);
  const [questModalVisible, setQuestModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<null | {
    latitude: number;
    longitude: number;
  }>(null);
  const [questMarkers, setQuestMarkers] = useState<MarkerData[]>([]);
  const [userLocation, setUserLocation] = useState<null | {
    latitude: number;
    longitude: number;
  }>(null);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
    }
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.log('Error getting user location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const fetchPlaceName = async (
    latitude: number,
    longitude: number,
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch place name');
      }

      const data = await response.json();

      const placeName = data.display_name;
      return placeName;
    } catch (error) {
      console.error('Error fetching place name:', error);
      return '';
    }
  };

  useEffect(() => {
    loadMarkersFromStorage();
  }, []);

  useEffect(() => {
    saveMarkersToStorage();
  }, [questMarkers]);

  const loadMarkersFromStorage = async () => {
    try {
      const questData = await AsyncStorage.getItem('questMarkers');

      if (questData !== null) {
        setQuestMarkers(JSON.parse(questData));
      }
    } catch (error) {
      console.error('Error loading markers from AsyncStorage:', error);
    }
  };

  const saveMarkersToStorage = async () => {
    try {
      await AsyncStorage.setItem('questMarkers', JSON.stringify(questMarkers));
    } catch (error) {
      console.error('Error saving markers to AsyncStorage:', error);
    }
  };

  const savePlaceNameToStorage = async (placeName: string) => {
    try {
      await AsyncStorage.setItem('placeName', placeName);
    } catch (error) {
      console.error('Error saving place name to AsyncStorage:', error);
    }
  };

  const handleQuestPress = async (event: any) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;
    const newQuestMarker: MarkerData = {
      id: `quest_${Date.now()}`,
      coordinates: {latitude, longitude},
    };

    try {
      const placeName = await fetchPlaceName(latitude, longitude);
      if (placeName) {
        savePlaceNameToStorage(placeName);
      } else {
      }
    } catch (error) {
      console.error('Error fetching place name:', error);
    }

    setQuestMarkers([...questMarkers, newQuestMarker]);
    setSelectedLocation(newQuestMarker.coordinates);
    setQuestModalVisible(true);
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

  const saveQuestDetailsToStorage = async (questDetails: MarkerData) => {
    try {
      const existingQuestDetails = await AsyncStorage.getItem('questDetails');
      let parsedQuestDetails = existingQuestDetails
        ? JSON.parse(existingQuestDetails)
        : [];

      parsedQuestDetails.push(questDetails);
      await AsyncStorage.setItem(
        'questDetails',
        JSON.stringify(parsedQuestDetails),
      );
    } catch (error) {
      console.error('Error saving quest details to AsyncStorage:', error);
    }
  };

  const handleSaveQuest = async (details: any) => {
    // console.log('Quest details:', details);

    const {quest, level, type, reward, timeLimit, hints} = details;

    if (selectedLocation) {
      const {latitude, longitude} = selectedLocation;
      const newQuestMarker: MarkerData = {
        id: `quest_${Date.now()}`,
        coordinates: {latitude, longitude},
        questDetail: {quest, level, type, reward, timeLimit, hints},
      };

      try {
        await saveQuestDetailsToStorage(newQuestMarker);
      } catch (error) {
        console.error('Error saving quest details to AsyncStorage:', error);
      }

      setQuestMarkers([...questMarkers, newQuestMarker]);
      setQuestModalVisible(false);
      setSelectedLocation(null);
    }
  };

  return (
    <View style={styles.container}>
      {mapReady && userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation={true}
          // followsUserLocation={true}
          onPress={handleQuestPress}>
          {userLocation && (
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Current Location"
              pinColor="red"
            />
          )}
          {questMarkers.map(marker => (
            <Marker
              key={marker.id}
              coordinate={marker.coordinates}
              title="Quest Marker"
              pinColor="blue"
              onPress={() => setSelectedLocation(marker.coordinates)}
            />
          ))}
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              pinColor="green"
            />
          )}
        </MapView>
      )}
      {questMarkers && (
        <QuestModal
          visible={questModalVisible}
          onSave={handleSaveQuest}
          onClose={() => {
            setQuestModalVisible(false);
            setSelectedLocation(null);
          }}
        />
      )}
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
    height: Dimensions.get('window').height * 0.94,
  },
});

export default MapViews;
