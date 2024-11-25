import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const ButtonWithTwoIcons = ({startIcon, endIcon, onPress, style, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {startIcon && <Image source={startIcon} style={styles.icon} />}
      <Text style={styles.buttonText}>{title}</Text>
      {endIcon && (
        <Image source={endIcon} style={[styles.icon, {marginRight: 0}]} />
      )}
    </TouchableOpacity>
  );
};

export default ButtonWithTwoIcons;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center', // Vertically center align items
    justifyContent: 'space-between', // Space between start and end icons
    padding: 16,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#ffffff', // Add padding to provide spacing
  },
  icon: {
    width: 24, // Set the width of your icons
    height: 24, // Set the height of your icons
    marginRight: 8, // Spacing between icon and button text
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
  },
});
