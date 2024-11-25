import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const OrderSteps = ({currentStep}) => {
  // Define icon sources with conditional "_f" suffix
  const closedBoxIcon =
    currentStep >= 1
      ? require('../../assets/icons/closedBox.png')
      : require('../../assets/icons/closedBox_gray.png');
  const truckIcon =
    currentStep >= 2
      ? require('../../assets/icons/truck.png')
      : require('../../assets/icons/truck_gray.png');
  const carryIcon =
    currentStep >= 3
      ? require('../../assets/icons/carry_f.png')
      : require('../../assets/icons/carry.png');
  const openBoxIcon =
    currentStep >= 4
      ? require('../../assets/icons/openBox_f.png')
      : require('../../assets/icons/openBox.png');
  const tickIcon = require('../../assets/icons/tick.png');
  const tickFocusedIcon = require('../../assets/icons/tick_f.png');

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <Image
          resizeMode={'center'}
          style={[styles.bigIcon]}
          source={closedBoxIcon}
        />
        <Image
          resizeMode={'center'}
          style={styles.bigIcon}
          source={truckIcon}
        />
        <Image
          resizeMode={'center'}
          style={styles.bigIcon}
          source={carryIcon}
        />
        <Image
          resizeMode={'center'}
          style={styles.bigIcon}
          source={openBoxIcon}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          resizeMode={'center'}
          style={[styles.smIcon, {marginStart: 10}]}
          source={currentStep >= 1 ? tickFocusedIcon : tickIcon}
        />
        <View
          style={[
            styles.line,
            {backgroundColor: currentStep >= 2 ? 'black' : '#9E9E9E'},
          ]}
        />
        <Image
          resizeMode={'center'}
          style={styles.smIcon}
          source={currentStep >= 2 ? tickFocusedIcon : tickIcon}
        />
        <View
          style={[
            styles.line,
            {backgroundColor: currentStep >= 3 ? 'black' : '#9E9E9E'},
          ]}
        />
        <Image
          resizeMode={'center'}
          style={styles.smIcon}
          source={currentStep >= 3 ? tickFocusedIcon : tickIcon}
        />
        <View
          style={[
            styles.line,
            {backgroundColor: currentStep >= 4 ? 'black' : '#9E9E9E'},
          ]}
        />
        <Image
          resizeMode={'center'}
          style={[styles.smIcon, {marginEnd: 10}]}
          source={currentStep >= 4 ? tickFocusedIcon : tickIcon}
        />
      </View>
    </View>
  );
};

export default OrderSteps;

const styles = StyleSheet.create({
  bigIcon: {
    height: 24,
    width: 40,
  },
  smIcon: {
    height: 16,
    width: 16,
  },
  column: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 2,
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 10,
  },
});
