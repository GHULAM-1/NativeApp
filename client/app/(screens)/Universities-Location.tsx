import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getNearbyUniversities } from '@/lib/api/api';

type University = {
  lat: string;
  lon: string;
  name?: string;
  display_name?: string;
  address?: {
    road?: string;
  };
};

const MapScreen = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { location, universities } = await getNearbyUniversities();
        setLocation(location); 
        setUniversities(universities); 
      } catch (error) {
        console.error('Error fetching data for map:', error);
      }
    };

    fetchData();
  }, []);

  if (!location) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* User's current location */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You Are Here"
        />

        {universities.map((university, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(university.lat), 
              longitude: parseFloat(university.lon),
            }}
            title={university.name || university.display_name || 'Unknown University'}
            description={university.address?.road || 'No address available'}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
