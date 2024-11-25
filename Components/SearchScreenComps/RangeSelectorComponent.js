import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Slider from 'rn-range-slider';
import Thumb from '../Slider/Thumb';
import Rail from '../Slider/Rail';
import Label from '../Slider/Label';
import Notch from '../Slider/Notch';
import RailSelected from '../Slider/RailSelected';

const CustomSlider = ({onSelect}) => {
  const [lowValue, setLowValue] = useState(20);
  const [highValue, setHighValue] = useState(80);

  const handleValueChange = (low, high) => {
    setLowValue(low);
    setHighValue(high);
    onSelect({id: 1, lowPrice: low, highPrice: high});
  };

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        min={0}
        max={100}
        step={1}
        lowValue={lowValue}
        highValue={highValue}
        renderThumb={Thumb}
        renderRail={Rail}
        renderRailSelected={RailSelected}
        renderLabel={Label}
        renderNotch={Notch}
        onValueChanged={handleValueChange}
      />
      <Text style={styles.valueText}>
        {lowValue} - {highValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
  },
  slider: {
    width: '80%',
  },
  thumbContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 40,
    height: 40,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'blue', // Customize the dot color here
  },
  rail: {
    height: 2,
    backgroundColor: 'gray', // Customize the rail color here
  },
  railSelected: {
    height: 2,
    backgroundColor: 'blue', // Customize the selected rail color here
  },
  label: {
    color: 'black', // Customize the label color here
  },
  notch: {
    width: 1,
    height: 8,
    backgroundColor: 'gray', // Customize the notch color here
  },
  valueText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Customize the value text color here
  },
});

export default CustomSlider;
