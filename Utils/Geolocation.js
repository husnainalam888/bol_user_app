import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {showLocationEnabler} from './Modules';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  const handleLocationChange = newLocation => {
    setLocation(newLocation);
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'This app needs access to your location for accurate data.',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            startGeolocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        startGeolocation();
      }
    };

    const startGeolocation = () => {
      const watchId = Geolocation.watchPosition(
        handleLocationChange,
        error => {
          console.error(error);
          showLocationEnabler();
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
          interval: Platform.OS === 'android' ? 1000 : 0,
        },
      );

      return () => {
        Geolocation.clearWatch(watchId);
      };
    };

    requestLocationPermission();

    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  return location;
};

export default useGeolocation;
