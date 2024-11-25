import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const SocialLoginButton = ({iconSource, title, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={iconSource} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  title: {
    color: 'black', // Change this to your desired text color
    fontSize: 14, // Change this to your desired font size
  },
});

export default SocialLoginButton;
