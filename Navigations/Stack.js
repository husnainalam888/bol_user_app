// StackNavigator.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from '../Screens/Dashboard';
import ProductOverview from '../Screens/ProductOverview';
import Reviews from '../Screens/Reviews';
import Notifications from '../Screens/Notifications';
import WishList from '../Screens/WishList';
import MostPopular from '../Screens/MostPopular';
import SpecialOffers from '../Screens/SpecialOffers';
import SearchScreen from '../Screens/SearchScreen';
import BottomTabs from './Bottom/BottomTabs';
import Checkout from '../Screens/Checkout';
import ShippingAddress from '../Screens/ChoseShippingAdress';
import ChooseShippingType from '../Screens/ChoseShippingType';
import TrackOrder from '../Screens/TrackOrder';
import EditProfile from '../Screens/EditProfile';
import AddNewAddress from '../Screens/AddNewAddress';
import IntroScreen from '../Screens/IntroScreen';
import SigninSignUp from '../Screens/SigninSignUp';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';
import ChangePassword from '../Screens/ChangePassword';
import TrackOrderInRealTime from '../Screens/TrackOrderInRealTime';
import LiveScreen from '../Screens/LiveScreen';
import ChannelDetails from '../src/live/screens/ChannelDetails';
import SearchLive from '../src/live/screens/SearchLive';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="IntroScreen" component={IntroScreen} /> */}
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="LoginSignUp" component={SigninSignUp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ProductOverview" component={ProductOverview} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="MostPopular" component={MostPopular} />
      <Stack.Screen name="SpecialOffers" component={SpecialOffers} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
      <Stack.Screen name="ShippingType" component={ChooseShippingType} />
      <Stack.Screen name="TrackOrder" component={TrackOrderInRealTime} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddNewAddress" component={AddNewAddress} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="LiveScreen" component={LiveScreen} />
      <Stack.Screen name="ChannelDetails" component={ChannelDetails} />
      <Stack.Screen name="SearchLive" component={SearchLive} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
