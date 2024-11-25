import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {Colors} from '../../Utils/Colors';
import DropShadow from 'react-native-drop-shadow';

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <DropShadow style={{backgroundColor: 'white', ...styles.shadow}}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          let imageName = '';
          switch (route.name) {
            case 'Home':
              imageName = isFocused
                ? require('../../assets/bottomIcons/home_f.png')
                : require('../../assets/bottomIcons/home.png');
              break;
            case 'Cart':
              imageName = isFocused
                ? require('../../assets/bottomIcons/cart_f.png')
                : require('../../assets/bottomIcons/cart.png');
              break;
            case 'Orders':
              imageName = isFocused
                ? require('../../assets/bottomIcons/orders_f.png')
                : require('../../assets/bottomIcons/orders.png');
              break;
            case 'Wallet':
              imageName = isFocused
                ? require('../../assets/bottomIcons/wallet_f.png')
                : require('../../assets/bottomIcons/wallet.png');
              break;
            case 'Profile':
              imageName = isFocused
                ? require('../../assets/bottomIcons/profile_f.png')
                : require('../../assets/bottomIcons/profile.png');
              break;
            case 'Live':
              imageName = isFocused
                ? require('../../assets/bottomIcons/live-fill.png')
                : require('../../assets/bottomIcons/live-outline.png');
              break;
            default:
              break;
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[styles.tab]}>
              <Image source={imageName} style={{width: 24, height: 24}} />
              <Text style={{color: isFocused ? 'black' : Colors.uf_gray}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    // Add elevation for Android shadow
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  shadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});

export default CustomTabBar;
