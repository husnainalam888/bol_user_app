import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React from 'react';

const ProfileMenuItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
      }}>
      <Image
        resizeMode={Platform.OS == 'android' ? 'center' : 'contain'}
        style={styles.startIcon}
        source={props.startIcon}
      />
      <Text style={styles.title}> {props.title} </Text>
      <Image
        style={styles.startIcon}
        source={require('../../assets/icons/arrow_right.png')}
      />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;

const styles = StyleSheet.create({
  startIcon: {
    height: 24,
    width: 24,
    marginEnd: 10,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
});
