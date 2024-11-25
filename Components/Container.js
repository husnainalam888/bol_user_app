import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {Colors} from '../Utils/Colors';

const Container = ({children}) => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.gray2,
    paddingHorizontal: 20,
  },
});
