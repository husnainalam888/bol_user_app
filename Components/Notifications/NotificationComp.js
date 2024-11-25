import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

const Notification = ({type, title, message}) => {
  const imageSource =
    type === 'offer'
      ? require('../../assets/icons/offer.png')
      : type === 'payment'
      ? require('../../assets/icons/payment.png')
      : type === 'location'
      ? require('../../assets/icons/location.png')
      : type === 'account'
      ? require('../../assets/icons/account.png')
      : require('../../assets/icons/wallet.png');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  message: {
    fontSize: 14,
    marginTop: 5,
    color: 'gray',
  },
});

export default Notification;
