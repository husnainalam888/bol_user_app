import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Slider from 'rn-range-slider';

import Thumb from '../../Thumb';
import Rail from '../../Rail';
import RailSelected from '../../RailSelected';
import Notch from '../../Notch';
import Label from '../../Label';

import styles from './styles';

const SliderComp = props => {
  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(props?.selected?.lowPrice ?? 1);
  const [high, setHigh] = useState(props?.selected?.highPrice ?? 1000);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(props?.selected?.highPrice ?? 1000);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(
    name => <Thumb name={name} range={name == 'low' ? low : high} />,
    [],
  );
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
    if (props.onSelect)
      props.onSelect({id: 1, lowPrice: lowValue, highValue: highValue});
  }, []);
  const toggleRangeEnabled = useCallback(
    () => setRangeDisabled(!rangeDisabled),
    [rangeDisabled],
  );
  const setMinTo50 = useCallback(() => setMin(50), []);
  const setMinTo0 = useCallback(() => setMin(0), []);
  const setMaxTo100 = useCallback(() => setMax(100), []);
  const setMaxTo500 = useCallback(() => setMax(500), []);
  const toggleFloatingLabel = useCallback(
    () => setFloatingLabel(!floatingLabel),
    [floatingLabel],
  );

  return (
    <View>
      <Slider
        style={styles.slider}
        min={min}
        max={max}
        step={1}
        disableRange={rangeDisabled}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderLabel={renderLabel}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <Text style={styles.rangeText}>${low}</Text>
        <Text style={styles.rangeText}>${high}</Text>
      </View>
    </View>
  );
};

export default SliderComp;
