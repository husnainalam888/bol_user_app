import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

// Define your two screens (OnGoing and Completed)
import OnGoing from '../../Tabs/Orders/Tabs/OnGoing';
import Completed from '../../Tabs/Orders/Tabs/Completed';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// Create a MaterialTopTabNavigator
const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const getIndicatorColor = () => {
    const focusedRouteName = route.name;
    return focusedRouteName === 'OnGoing' ? 'gray' : 'black';
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: Colors.uf_gray,
        indicatorStyle: {
          backgroundColor: getIndicatorColor(),
          height: 3,
          borderRadius: 4,
        },
        labelStyle: {
          fontFamily: 'Poppins-SemiBold',
          textTransform: 'none',
        },
        style: {
          backgroundColor: '#f8f8f8',
          elevation: 0,
          borderBottomWidth: 2,
          borderColor: '#eeeeee',
        },
      }}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Ongoing" component={OnGoing} />
      <Tab.Screen name="Completed" component={Completed} />
    </Tab.Navigator>
  );
};

export default TopTabs;
