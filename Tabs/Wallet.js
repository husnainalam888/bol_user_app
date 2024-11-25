import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ErrorComp from '../Components/Common/ErrorComp';

const Wallet = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <ErrorComp
        title="No Wallet"
        desc="You Don't have any wallet at this time"
      />
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
