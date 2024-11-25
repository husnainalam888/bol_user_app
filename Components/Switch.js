import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../Utils/Colors';

const Switch = ({onPress, state}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={[styles.switch, !state && {backgroundColor: Colors.gray1}]}>
      <View
        style={[
          styles.innerSwitch,
          !state && {alignSelf: 'flex-start'},
        ]}></View>
    </TouchableOpacity>
  );
};

export default Switch;

const styles = StyleSheet.create({
  switch: {
    backgroundColor: Colors.primary1,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerSwitch: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-end',
    margin: 4,
  },
});
