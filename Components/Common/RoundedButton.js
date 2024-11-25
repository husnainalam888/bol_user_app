import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const RoundedButton = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.container, props.style]}>
      {props.endIcon && (
        <Image style={styles.cartIcon} source={props.endIcon} />
      )}
      <Text style={[styles.cartText, props.titleStyle]}>{props.title}</Text>
      {props.endIcon && (
        <Image style={styles.cartIcon} source={props.endIcon} />
      )}
    </TouchableOpacity>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 100,
    justifyContent: 'center',
  },
  cartIcon: {
    height: 16,
    width: 16,
  },
  cartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
});
