import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../Utils/Colors';
import ShadowContainer from './Shadow';
import Switch from './Switch';

const SwitchRow = ({label, onPress, state}) => {
  return (
    <ShadowContainer>
      <View style={styles.stopShift}>
        <Text style={styles.stopShiftText}>{label}</Text>
        <Switch onPress={onPress} state={state} />
      </View>
    </ShadowContainer>
  );
};

export default SwitchRow;

const styles = StyleSheet.create({
  stopShift: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    marginTop: -20,
    paddingVertical: 10,
    paddingStart: 20,
    paddingEnd: 10,
    marginHorizontal: 20,
  },
  stopShiftText: {
    color: '#000',
  },
});
