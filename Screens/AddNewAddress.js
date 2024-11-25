import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Header from '../Components/Common/Header';
import useGeolocation from '../Utils/Geolocation';
import {
  getFormattedAddressFromCoordinates,
  geocodeAddress,
  mmkvStorage,
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

const AddNewAddress = ({navigation}) => {
  const currentLocation = useGeolocation();
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const showAlert = useCustomAlert();
  const mapViewRef = React.useRef(null);
  const [showModal, setShowModal] = useState(true);
  const [location, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [liveLocation, setLiveLocation] = useState('');
  const [addresses, setAddresses] = useMMKVStorage(
    'addresses',
    mmkvStorage,
    null,
  );
  const [selectedAddress, setSelectedAddress] = useMMKVStorage(
    'selectedAddress',
    mmkvStorage,
    null,
  );

  const fetchAddress = async () => {
    try {
      const response = await getRequest('get_address/' + user.id);
      setAddress(response.data);
      setSelectedAddress(response.data[response.data.length - 1]);
    } catch (e) {
      console.log('Eror:', e);
    }
  };
  const initialRegion = {
    latitude: 37.78825, // Replace with the desired latitude
    longitude: -122.4324, // Replace with the desired longitude
    latitudeDelta: 0.0922, // Controls the zoom level (smaller values zoom in)
    longitudeDelta: 0.0421, // Controls the zoom level (smaller values zoom in)
  };
  const handleMapPress = async event => {
    const {coordinate} = event.nativeEvent;
    setSelectedLocation(coordinate);
    setLatitude(coordinate.latitude);
    setLongitude(coordinate.longitude);
    setShowModal(true);
    let tem = await getFormattedAddressFromCoordinates(coordinate);
    console.log('tem', tem);
    setAddress(tem.formattedAddress);
    setCity(tem.city);
    setCountry(tem.country);
    setPostalCode(tem.postalCode);

    console.log('coordinate', coordinate);
  };

  const updateMapLocation = async (address, byCoordinate = false) => {
    if (address == '' && byCoordinate == false) {
      return;
    }
    // Construct the address string from postalCode, city, and country

    // Use the geocodeAddress function to get the coordinates for the address
    try {
      let coordinates;
      if (byCoordinate != false) {
        coordinates = byCoordinate;
      } else {
        setSearching(true);
        coordinates = await geocodeAddress(address);
        setSearching(false);
      }
      if (coordinates) {
        setSelectedLocation(coordinates);
        console.log('Coordinates:', coordinates);

        // Create a new region that centers the map on the selected location
        const newRegion = {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.0922, // You can adjust the zoom level as needed
          longitudeDelta: 0.0421,
        };

        // Use animateToRegion to smoothly move the camera to the new location
        mapViewRef.current.animateToRegion(newRegion, 1000); // Adjust the duration as needed
        console.log('Coordinates:', coordinates);
        setLatitude(coordinates.latitude);
        setLongitude(coordinates.longitude);

        let tem = await getFormattedAddressFromCoordinates(coordinates);
        console.log('tem', tem);
        setAddress(tem.formattedAddress);
        setCity(tem.city);
        setCountry(tem.country);
        setPostalCode(tem.postalCode);
      } else {
        console.log('Address not found');
        showAlert('Address not found', 'Failed to find address');
      }
    } catch (e) {
      console.log('Error:', e);
      setSearching(false);
    }
  };
  const isAnyFieldEmpty = () => {
    if (!name) {
      showAlert('Please enter your name', 'Error Occured');
      return true;
    }
    if (!country) {
      showAlert('Please enter your country', 'Error Occured');
      return true;
    }
    if (!city) {
      showAlert('Please enter your city', 'Error Occured');
      return true;
    }
    if (!postalCode) {
      showAlert('Please enter your postal code', 'Error Occured');
      return true;
    }
    if (!contactNo) {
      showAlert('Please enter your contact number', 'Error Occured');
      return true;
    }
    if (!latitude) {
      showAlert('Please enter latitude or select on the map', 'Error Occured');
      return true;
    }
    if (!longitude) {
      showAlert('Please enter longitude or select on the map', 'Error Occured');
      return true;
    }
    if (!address) {
      showAlert('Please enter your address', 'Error Occured');
      return true;
    }
    return false;
  };

  const handleAddAddress = async () => {
    if (isAnyFieldEmpty()) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('country', country);
      formData.append('city', city);
      formData.append('postal_code', postalCode);
      formData.append('contact_no', contactNo);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('address', address);
      setSearching(true);
      const response = await postRequest(`insert_address/${user.id}`, formData);
      setSearching(false);
      if (response.message == 'success') {
        console.log('Address Response  :', response);
        fetchAddress();
        showAlert(
          'Address added successfully',
          'Success',
          require('../assets/icons/tick_f.png'),
        );
        navigation.goBack();

        setShowModal(false);
      }
    } catch (error) {
      setSearching(false);
      showAlert(
        'Something went wrong. Please try again later.' + error.message,
        'Error Occured',
      );
    }
  };
  handleUserLocationChange = event => {
    const {coordinate} = event.nativeEvent;
    setLiveLocation(coordinate);
  };
  return (
    <MyContainer isLoading={searching}>
      <SafeAreaView style={{flex: 1}}>
        <MapView
          ref={mapViewRef}
          showsBuildings
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          animateToViewingAngle={45}
          style={styles.map}
          zoomEnabled={true}
          onUserLocationChange={handleUserLocationChange}
          onPress={handleMapPress}
          initialCamera={{pitch: 60, heading: 60, altitude: 1000, zoom: 15}}
          // customMapStyle={customMapStyle}
          initialRegion={initialRegion}>
          {location && (
            <Marker coordinate={location} onPress={() => setShowModal(true)}>
              <Image
                resizeMode="contain"
                tintColor={'black'}
                source={require('../assets/icons/location.png')}
                style={{height: 40, width: 40}}
              />
            </Marker>
          )}
        </MapView>
        <Header
          title="Add New Address"
          onChangeText={text => setSearchText(text)}
          style={{
            zIndex: 1,
            backgroundColor: 'white',
            paddingBotom: 8,
            marginTop: -16,
          }}
          showFind={true}
          showFilter={false}
          searchStyle={{backgroundColor: '#f3f3f3'}}
          onPressFind={() => updateMapLocation(searchText)}
        />
        <TouchableOpacity
          style={{alignSelf: 'flex-end', zIndex: 10}}
          onPress={() => {
            if (liveLocation == '')
              showAlert(
                'Please Check GPS Permission ',
                'Failed to get location',
              );
            else {
              updateMapLocation(false, {
                latitude: liveLocation.latitude,
                longitude: liveLocation.longitude,
              });
            }
          }}>
          <Image
            source={require('../assets/icons/currentLocation.png')}
            style={{
              height: 50,
              width: 50,
              alignSelf: 'flex-end',
              margin: 10,
              marginTop: 20,
            }}
          />
        </TouchableOpacity>
        {showModal == false && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              padding: 16,
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'white',
            }}>
            <RoundedButton
              title={'Show Address Fields'}
              onPress={() => setShowModal(true)}
            />
          </View>
        )}
        <AddressModal
          title={'Address Details'}
          visible={showModal}
          onAddPress={handleAddAddress}
          onClose={() => setShowModal(false)}>
          <ScrollView
            style={{
              flexGrow: 0,
              maxHeight: Dimensions.get('window').height * 0.33,
            }}
            contentContainerStyle={{flexGrow: 0}}>
            <InputComp
              placeholder="Enter name"
              style={{marginVertical: 20}}
              value={name}
              onChangeText={text => setName(text)} // Update the 'name' state
            />
            <InputComp
              placeholder="Enter Country"
              style={{marginVertical: 20}}
              value={country}
              onChangeText={text => setCountry(text)} // Update the 'country' state
            />
            <InputComp
              placeholder="Enter City"
              style={{marginVertical: 20}}
              value={city}
              onChangeText={text => setCity(text)} // Update the 'city' state
            />
            <InputComp
              placeholder="Enter Postal Code"
              style={{marginVertical: 20}}
              value={postalCode}
              onChangeText={text => setPostalCode(text)} // Update the 'postalCode' state
            />
            <InputComp
              placeholder="Enter Contact No."
              style={{marginVertical: 20}}
              value={contactNo}
              onChangeText={text => setContactNo(text)} // Update the 'contactNo' state
            />
            <InputComp
              placeholder="Enter latitude or select on map"
              style={{marginVertical: 20}}
              value={latitude.toString()}
              onChangeText={text => setLatitude(text)} // Update the 'latitude' state
            />
            <InputComp
              placeholder="Enter longitude or select on map"
              style={{marginVertical: 20}}
              value={longitude.toString()}
              onChangeText={text => setLongitude(text)} // Update the 'longitude' state
            />
            <InputComp
              placeholder="Enter your address"
              style={{marginVertical: 20}}
              value={address}
              endIcon={require('../assets/icons/location_line.png')}
              onChangeText={text => setAddress(text)} // Update the 'address' state
            />
          </ScrollView>
        </AddressModal>
      </SafeAreaView>
    </MyContainer>
  );
};

export default AddNewAddress;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    marginTop: 70,
  },
  heading: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
