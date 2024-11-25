import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../Components/Common/Header';
import CartItem from '../Components/CartScreenComps/CartItem';
import OrderSteps from '../Components/TrackOrderComps/OrderSteps';
import StatusRow from '../Components/TrackOrderComps/StatusRow';
import StatusList from '../Components/TrackOrderComps/StatusList';

const TrackOrder = ({navigation, route}) => {
  const {item} = route.params;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Track Order" showSearch={false} />
      <View style={styles.subContainer}>
        <CartItem item={item} context={'track'} />
        <OrderSteps
          currentStep={
            item.completed_at != null
              ? 4
              : item.picket_at != null
              ? 3
              : item.assigned_at != null
              ? 2
              : 1
          }
        />
        <Text style={styles.heading}>
          {item.completed_at != null
            ? 'Your Order was delivered successfully'
            : item.picket_at != null
            ? 'Your Order was picked by the delivery boy'
            : item.assigned_at != null
            ? 'Your Order was assigned to delivery boy'
            : 'Your Order is being prepared'}
        </Text>
        <View style={styles.line} />
        <Text style={[styles.heading, {alignSelf: 'flex-start'}]}>
          Order Status Details
        </Text>
        <StatusList item={item} />
      </View>
    </SafeAreaView>
  );
};

export default TrackOrder;

const styles = StyleSheet.create({
  subContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  heading: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#e9e9e9',
  },
});
