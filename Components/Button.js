import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '../Utils/Colors';
import Shadow from './Shadow';

const Button = ({label, onPress, disabled = false, type, style}) => {
  const buttonStyles = [
    styles.button,
    type == 'primary' && styles.primaryButton,
    disabled && styles.disabledButton,
    type == 'secondary' && styles.secondary,
  ];

  return (
    <Shadow>
      <TouchableOpacity
        style={[buttonStyles, style]}
        onPress={onPress}
        disabled={disabled}>
        <Text
          style={[styles.buttonText, type == 'secondary' && {color: '#000'}]}>
          {label}
        </Text>
      </TouchableOpacity>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  primaryButton: {
    backgroundColor: Colors.primary1,
  },
  disabledButton: {
    backgroundColor: Colors.disabled,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondary: {
    backgroundColor: '#ffffff',
  },
});

export default Button;
