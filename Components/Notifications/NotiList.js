import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Notification from './NotificationComp';

const DATA = [
  {
    id: '1',
    type: 'offer',
    title: 'New Offer',
    message: '50% off on selected items!',
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment Received',
    message: 'You have received a payment of $100.',
  },
  {
    id: '3',
    type: 'location',
    title: 'Location Update',
    message: 'Your order is out for delivery.',
  },
  // Add more notification data as needed...
];

const NotiList = props => {
  const renderNotification = ({item}) => (
    <Notification type={item.type} title={item.title} message={item.message} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{props.date || 'Today'}</Text>
      <FlatList
        data={DATA}
        renderItem={renderNotification}
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  listContainer: {},
});

export default NotiList;
