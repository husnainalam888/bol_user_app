import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Colors} from '../Utils/Colors';
import Shadow from './Shadow';
import {calculateDistance, getTimeAgo, mmkvStorage} from '../Utils/Modules';
import {useMMKVStorage} from 'react-native-mmkv-storage';

const OrderComp = ({order, context, onPressViewLocation, ...props}) => {
  const [skipList, setSkipList] = useMMKVStorage('skips', mmkvStorage, []);
  const [orders, setOrders] = useMMKVStorage('orders', mmkvStorage, []);
  const handleSkip = () => {
    let temp = skipList;
    temp.push(order);
    setSkipList(temp);
    const filteredOrders = orders.data.orders.filter(
      order => !skipList.some(skipItem => skipItem.id === order.id),
    );
    let result = orders;
    result.data.orders = filteredOrders;
    setOrders(result);
  };
  return (
    <Shadow style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.topRow}>
            <Text style={styles.orderId}>
              Order No. : #{order.order.order_no}
            </Text>
            <View style={styles.time}>
              <Text style={styles.timeText}>
                {getTimeAgo(order.order.created_at)}
              </Text>
            </View>
          </View>
          <View style={styles.distanceRow}>
            <View style={styles.point}>
              <View style={styles.pointInner} />
            </View>
            <View style={styles.distanceTextContainer}>
              <View style={styles.dashedLine} />
              <Text style={styles.distanceText}>
                {calculateDistance(
                  order.vendor.latitude,
                  order.vendor.longitude,
                  order.customer_address?.latitude,
                  order.customer_address?.longitude,
                )}
              </Text>
              <View style={styles.dashedLine} />
            </View>
            <View style={styles.point}>
              <View style={styles.pointInner} />
            </View>
          </View>
          <View style={styles.addressRow}>
            <Text style={[styles.address, {marginEnd: 10}]}>
              {order.vendor?.address}
            </Text>
            <Text
              style={[styles.address, {textAlign: 'right', marginStart: 10}]}>
              {order.customer_address?.address}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              backgroundColor: Colors.gray2,
              padding: 10,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Image
              resizeMode="center"
              source={{
                uri:
                  order.product.images != ''
                    ? order.product.images
                    : 'https://multivendorv3.freelanceworkxyz.site/public/images/561648851.png',
              }}
              style={{
                height: 110,
                width: '100%',
              }}
            />
          </View>
          <Text numberOfLines={1} style={{marginTop: 10}}>
            {order.product.name}
          </Text>
          <View style={[styles.paymentRow, {marginTop: 10, marginBottom: 0}]}>
            <Text style={styles.payment}>Average-Time</Text>
            <Text style={[styles.paymentAmount, {fontSize: 14}]}>
              {order.product.delivery_time}
            </Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.payment}>Payment - Cash</Text>
            <Text style={styles.paymentAmount}>${order?.price}</Text>
          </View>
          {context == 'home' && (
            <View style={styles.actionRow}>
              <TouchableOpacity onPress={handleSkip}>
                <Text style={styles.skipButton}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={props.onPressAccept}
                style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept Order</Text>
              </TouchableOpacity>
            </View>
          )}
          {context == 'order' && (
            <TouchableOpacity
              onPress={onPressViewLocation}
              style={styles.acceptButton}>
              <Text
                style={[
                  styles.acceptButtonText,
                  {textAlign: 'center', alignSelf: 'center'},
                ]}>
                View location
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: 10,
  },
  container: {
    paddingTop: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  innerContainer: {
    paddingTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 16,
    color: '#000',
  },
  time: {
    padding: 5,
    backgroundColor: Colors.primaryLight,
    borderRadius: 10,
  },
  timeText: {
    color: Colors.primaryText,
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  point: {
    backgroundColor: '#50A0FA33',
    padding: 4,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  pointInner: {
    height: 12,
    width: 12,
    backgroundColor: Colors.primary1,
    borderRadius: 10,
  },
  distanceTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    color: '#000',
    marginHorizontal: 4,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primary1,
  },
  addressRow: {
    flexDirection: 'row',
  },
  address: {
    flex: 1 / 2,
    color: '#000',
    marginTop: 5,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  payment: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'gainsboro',
    paddingVertical: 10,
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  skipButton: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    fontSize: 12,
    borderWidth: 0.5,
    color: '#000',
  },
  acceptButton: {
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: Colors.primary1,
  },
  acceptButtonText: {
    alignSelf: 'flex-start',
    marginHorizontal: 12,
    marginVertical: 6,
    fontSize: 14,
    color: '#ffffff',
  },
});

export default OrderComp;
