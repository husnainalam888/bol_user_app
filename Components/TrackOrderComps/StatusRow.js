import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const StatusRow = ({noLine, message, subMessage, time}) => {
  const startIcon = require('../../assets/icons/mark.png');
  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.startIcon} source={startIcon} />
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <Text style={styles.heading}>{message} </Text>
          <Text style={styles.desc}> {subMessage} </Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
      {!noLine && <View style={styles.line} />}
    </View>
  );
};

export default StatusRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startIcon: {
    height: 30,
    width: 30,
    marginEnd: 10,
  },
  heading: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    color: 'gray',
  },
  time: {
    alignSelf: 'flex-start',
    color: 'gray',
  },
  line: {
    backgroundColor: 'black',
    height: 40,
    width: 2,
    marginStart: 15,
    marginVertical: 2,
  },
});
