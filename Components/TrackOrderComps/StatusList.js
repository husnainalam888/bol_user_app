import {StyleSheet, Text, FlatList, View} from 'react-native';
import React from 'react';
import StatusRow from './StatusRow';
import {init} from 'react-native-mmkv-storage';
import {dateTimeFromLong, separateDateAndTime} from '../../Utils/Modules';

const StatusList = ({item}) => {
  console.log(item);
  const data = [1, 2, 3, 4];
  return (
    <View>
      <StatusRow
        noLine={item.assigned_at == null}
        message={'Order placed at ' + dateTimeFromLong(item.created_at).date}
        subMessage={'Your order ID is ' + item.order_id}
        time={dateTimeFromLong(item.created_at).time}
      />
      {item.assigned_at != null && (
        <StatusRow
          noLine={item.picked_at == null}
          message={
            'Order Assigned at ' + separateDateAndTime(item.assigned_at).date
          }
          subMessage={'We have assigned a delivery boy to your order'}
          time={separateDateAndTime(item.assigned_at).time}
        />
      )}
      {item.picked_at != null && (
        <StatusRow
          noLine={item.completed_at == null}
          message={'Order Picked at ' + dateTimeFromLong(item.picked_at).date}
          subMessage={'Your order was picked from the vendor'}
          time={dateTimeFromLong(item.picked_at).time}
        />
      )}
      {item.completed_at != null && (
        <StatusRow
          noLine={true}
          message={
            'Order Completed at ' + dateTimeFromLong(item.completed_at).date
          }
          subMessage={"Don't forget to rate"}
          time={dateTimeFromLong(item.completed_at).time}
        />
      )}
    </View>
  );
};

export default StatusList;

const styles = StyleSheet.create({});
