import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';

const TotalStatus = ({orderCount, status}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.orderCount}>{orderCount}</Text>
      <Text style={styles.status}>{status}</Text>
    </View>
  );
};

export default TotalStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 50,
    alignItems: 'center',
    margin: 5,
    marginTop: 10,
    // Shadow properties for iOS
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
      },
      // Elevation for Android
      android: {
        elevation: 4,
      },
    }),
  },
  orderCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  status: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
});
