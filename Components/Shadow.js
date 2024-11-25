import React from 'react';
import {View, StyleSheet} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

const Shadow = ({children, style}) => {
  return (
    <DropShadow
      style={[
        {
          shadowColor: '#a9a9a9',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5,
        },
        style,
      ]}>
      {children}
    </DropShadow>
  );
};

const styles = StyleSheet.create({});

export default Shadow;
