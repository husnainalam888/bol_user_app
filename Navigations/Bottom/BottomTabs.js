import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import CustomTabBar from './CustomTabBar'; // Import your custom tab bar component
import Dashboard from '../../Screens/Dashboard';
import Cart from '../../Tabs/Cart';
import Orders from '../../Tabs/Orders/Orders';
import Profile from '../../Tabs/Profile';
import Wallet from '../../Tabs/Wallet';
import LiveScreen from '../../Screens/LiveScreen';
import LiveTab from '../../src/live/screens/LiveTab';
import SocketService from '../../socket/SocketService';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  useEffect(() => {
    SocketService.connect().on('connect', () => {
      console.log('connected to socket');
    });
  }, []);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />} // Use your custom tab bar component
      screenOptions={{
        headerShown: false, // Hide the header for all screens
      }}>
      <Tab.Screen name={'Home'} component={Dashboard} />
      <Tab.Screen name={'Cart'} component={Cart} />
      <Tab.Screen name={'Live'} component={LiveTab} />
      <Tab.Screen name={'Orders'} component={Orders} />
      <Tab.Screen name={'Profile'} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
