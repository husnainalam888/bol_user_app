import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {MapPolyline, Marker} from 'react-native-maps';
import Header from '../Components/Common/Header';
import useGeolocation from '../Utils/Geolocation';
import {
  getFormattedAddressFromCoordinates,
  geocodeAddress,
  mmkvStorage,
  getDirections,
} from '../Utils/Modules';
import DropDownModal from '../Components/ProfileComps/DropDownModal';
import InputComp from '../Components/Common/InputComp';
import AddressModal from '../Components/AddressScreenComps/AddressModal';
import {tempUser} from '../DemoApiResponses/User';
import {customMapStyle} from '../Utils/CustomMap';
import {useCustomAlert} from '../Components/Common/AlertProvider';
import {getRequest, postRequest} from '../Utils/API';
import {isLoaded, useMMKVStorage} from 'react-native-mmkv-storage';
import MyContainer from '../Components/Common/MyContainer';
import RoundedButton from '../Components/Common/RoundedButton';
import OrderSteps from '../Components/TrackOrderComps/OrderSteps';
import ButtonWithTwoIcons from '../Components/Common/ButtonWithTwoIcons';
import Button from '../Components/Button';
import {NodeGetRequest} from '../Utils/NodeApi';

const TrackOrderInRealTime = ({navigation, route}) => {
  const {item, customer} = route.params;
  const rider = item.delivery_boy;
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const [riderLocations, setRiderLocations] = useMMKVStorage(
    'riderLocations',
    mmkvStorage,
    [],
  );
  const showAlert = useCustomAlert();
  const mapViewRef = React.useRef(null);
  const [showModal, setShowModal] = useState(true);
  const [location, setSelectedLocation] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [liveLocation, setLiveLocation] = useState('');
  const [routeCoordinates, setRouteCoords] = useState(false);
  const initialRegion = {
    latitude: 37.78825, // Replace with the desired latitude
    longitude: -122.4324, // Replace with the desired longitude
    latitudeDelta: 0.0922, // Controls the zoom level (smaller values zoom in)
    longitudeDelta: 0.0421, // Controls the zoom level (smaller values zoom in)
  };
  const handleMapPress = async event => {
    const {coordinate} = event.nativeEvent;
  };
  useEffect(() => {
    // const location = riderLocations?.find(item => item?.riderId == 2);
    console.log('OrderItem', 'item : ', JSON.stringify(item, null, 2));
    console.log('OrderItem', 'Customer : ', customer);
    console.log('riderLocations', riderLocations);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {location} = await getNodeRiderLocation();
      const riderLocationFromApi = {
        location: {
          coords: location,
        },
      };
      const riderCurrentLocation = riderLocationFromApi;

      console.warn(
        'MapScren.js',
        'riderCurrentLocation :',
        riderLocationFromApi,
      );
      if (riderCurrentLocation?.location?.coords?.latitude != null) {
        updateMapLocation({
          latitude: riderCurrentLocation.location.coords.latitude,
          longitude: riderCurrentLocation.location.coords.longitude,
        });
        setLiveLocation({
          latitude: riderCurrentLocation.location.coords.latitude,
          longitude: riderCurrentLocation.location.coords.longitude,
        });
        const routes = await getDirections(
          `${riderCurrentLocation.location.coords.latitude},${riderCurrentLocation.location.coords.longitude}`,
          item.status == 'Picked'
            ? `${item?.cutomer.latitude},${item?.customer?.longitude}`
            : `${item?.vendor?.latitude},${item?.vendor?.longitude}`,
        );
        setRouteCoords(routes);
      }
    } catch (e) {
      console.log('fetchData error :', e);
    }
  };

  const updateMapLocation = async coordinates => {
    try {
      if (coordinates) {
        setSelectedLocation(coordinates);
        console.log('Coordinates:', coordinates);
        const newRegion = {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.005, // You can adjust the zoom level as needed
          longitudeDelta: 0.005,
        };
        mapViewRef.current.animateToRegion(newRegion, 1000);
        console.log('Coordinates:', coordinates);
      } else {
        console.log('Address not found');
        showAlert('Address not found', 'Failed to find address');
      }
    } catch (e) {
      console.log('Error:', e);
      setSearching(false);
    }
  };

  const getNodeRiderLocation = async () => {
    try {
      const nodeApiLocation = await NodeGetRequest(
        `rider/get_location?id=${rider.id}`,
      );
      return nodeApiLocation;
      console.log('nodeApi location', nodeApiLocation);
    } catch (e) {
      console.log('node api location error', e);
    }
  };

  return (
    <MyContainer isLoading={searching}>
      <SafeAreaView style={{flex: 1}}>
        <Header
          title="Track Your Order"
          showSearch={false}
          style={{
            zIndex: 1,
            backgroundColor: 'white',
            paddingBotom: 8,
            marginTop: -16,
          }}
        />
        <View style={styles.headingContainer}>
          <OrderSteps
            style={styles.step}
            currentStep={
              item.completed_at != null
                ? 4
                : item.picket_at != null
                ? 3
                : item.assigned_at != null
                ? 2
                : 1
            }
          />
          <Text style={styles.heading}>Picking up your order</Text>
          <Text style={styles.text}>Estimated Arrival: {'12:50 PM'}</Text>
        </View>
        <MapView
          ref={mapViewRef}
          showsBuildings
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={false}
          animateToViewingAngle={45}
          style={styles.map}
          zoomEnabled={true}
          onPress={handleMapPress}
          // initialCamera={{pitch: 60, heading: 60, altitude: 1000, zoom: 100}}
          customMapStyle={customMapStyle}
          initialRegion={initialRegion}>
          {liveLocation != '' && (
            <Marker
              coordinate={liveLocation}
              onPress={() => setShowModal(true)}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                  borderRadius: 30,
                }}>
                <Image
                  resizeMode="contain"
                  tintColor={'white'}
                  source={require('../assets/icons/closedBox.png')}
                  style={{height: 24, width: 24}}
                />
              </TouchableOpacity>
            </Marker>
          )}
          <Marker
            coordinate={{
              latitude: parseFloat(item.vendor.latitude),
              longitude: parseFloat(item.vendor.longitude),
            }}>
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}>
              <Image
                resizeMode="contain"
                tintColor={'white'}
                source={require('../assets/vendor.png')}
                style={{height: 24, width: 24}}
              />
            </TouchableOpacity>
          </Marker>
          {/* <Marker coordinate={{latitude: parseFloat(customer.l), longitude: -122.4324}} /> */}
          {routeCoordinates && (
            <MapPolyline
              coordinates={routeCoordinates}
              strokeWidth={7}
              strokeColor={'#000'}
            />
          )}
        </MapView>
        {item?.delivery_boy && (
          <View style={styles.riderView}>
            <Image
              style={styles.avatar}
              resizeMode="contain"
              source={require('../assets/user.png')}
            />
            <Text style={[{color: 'black', textAlign: 'center', fontSize: 16}]}>
              {item?.delivery_boy?.name}
            </Text>
            <Text
              style={[
                {textAlign: 'center', color: 'gray', marginHorizontal: 40},
              ]}>
              {'Taking care of your order today'}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Linking.openURL(`tel:${item?.delivery_boy?.phone}`);
              }}>
              <Text style={[styles.buttonText]}>Call</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </MyContainer>
  );
};

export default TrackOrderInRealTime;

const styles = StyleSheet.create({
  map: {
    flexGrow: 1,
  },
  heading: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
  },
  headingContainer: {
    marginHorizontal: 24,
    marginVertical: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 4,
    fontFamily: 'Poppins-Regular',
  },
  step: {
    marginVertical: 20,
    marginHorizontal: 24,
  },
  riderView: {
    paddingHorizontal: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 24,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: 16,
    marginBottom: 8,
    backgroundColor: '#ffffff',
  },
  button: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: '#000000',
    width: '90%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
});
