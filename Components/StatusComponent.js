import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ShadowContainer from './Shadow';
import {Colors} from '../Utils/Colors';

const StatusComponent = ({status, value, onPress, style}) => {
  const image =
    status == 'Pending'
      ? require('../assets/pending.png')
      : require('../assets/pending.png');
  return (
    <ShadowContainer>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, style]} blurRadius={25}>
          <View
            style={[StyleSheet.absoluteFill, {backgroundColor: Colors.white}]}
          />
          <Text style={styles.count}>{value}</Text>
          <Text style={{color: '#000'}}>{status}</Text>
        </View>
      </TouchableOpacity>
    </ShadowContainer>
  );
};

export default StatusComponent;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2 - 30,
    marginVertical: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 40,
    paddingHorizontal: 40,
  },
  count: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 10,
    color: '#000',
  },
});
