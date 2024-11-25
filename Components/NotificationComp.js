import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../Utils/Colors';

const NotiComp = () => {
  return (
    <View style={styles.innerNoti}>
      <View>
        <Text style={styles.text}>Today new orders</Text>
        <Text style={styles.claimText}>Claim order now</Text>
      </View>
      <View style={styles.round}>
        <View style={styles.innerWhite}>
          <Text style={{color: 'black'}}>05</Text>
        </View>
      </View>
    </View>
  );
};
export default NotiComp;

const styles = StyleSheet.create({
  innerNoti: {
    backgroundColor: Colors.primary3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 90,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  claimText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#ffffff',
  },
  round: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 30,
    justifyContent: 'center',
    padding: 8,
  },
  innerWhite: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 30,
  },
  text: {
    fontWeight: '500',
    fontSize: 12,
    marginBottom: 6,
    color: '#ffffff',
  },
});
