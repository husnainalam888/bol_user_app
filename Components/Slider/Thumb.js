import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';

const THUMB_RADIUS_LOW = 10;

const Thumb = ({name, range}) => {
  return <View style={styles.rootLow} />;
};

const styles = StyleSheet.create({
  rootLow: {
    width: THUMB_RADIUS_LOW * 2,
    height: THUMB_RADIUS_LOW * 2,
    borderRadius: THUMB_RADIUS_LOW,
    borderWidth: 5,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },
  range: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(Thumb);
