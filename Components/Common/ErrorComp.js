import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const ErrorComp = props => {
  return (
    <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'center'}}>
      <Image
        resizeMode="center"
        style={{height: '52%', width: '85%', alignSelf: 'center'}}
        source={props.icon || require('../../assets/icons/clipboard.png')}
      />
      <Text style={styles.heading}>{props.title}</Text>
      <Text style={styles.desc}>{props.desc}</Text>
    </View>
  );
};

export default ErrorComp;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
  },
});
