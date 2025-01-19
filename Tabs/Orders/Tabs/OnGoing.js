import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import ErrorComp from '../../../Components/Common/ErrorComp';
import CartItem from '../../../Components/CartScreenComps/CartItem';
import {shoes} from '../../../DemoApiResponses/DashboardApis';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {log, mmkvStorage} from '../../../Utils/Modules';
import MyContainer from '../../../Components/Common/MyContainer';
import {getRequest} from '../../../Utils/API';

const OnGoing = ({navigation}) => {
  const [orders, setOrders] = useMMKVStorage('orders', mmkvStorage, []);
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const [ongoingOrders, setOngoingOrders] = React.useState(orders);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    if (orders.length > 0) {
      const filtered = orders.filter(
        x =>
          x?.order_item?.[0]?.status != 'completed' && x.order_item.length > 0,
      );
      setOngoingOrders(filtered);
      setIsLoading(false);
    }
  }, [orders]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest(`get_customer_orders/${user.id}`);
      setIsLoading(false);
      log.info('Orders :', JSON.stringify(response, null, 2));
      const res = response.data;
      setOrders(res);
    } catch (e) {
      console.log('Error : ', e);
      setIsLoading(false);
    }
  };
  return (
    <MyContainer
      networkError={ongoingOrders.length == 0}
      isLoading={isLoading}
      imageSource={require('../../../assets/noDatalarge.png')}
      message={'You have no ongoing orders'}
      buttonText={'Refresh'}
      onPressBtn={() => fetchData()}>
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
          }
          showsVerticalScrollIndicator={false}
          style={{marginTop: 16}}
          data={ongoingOrders.reverse()}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <>
              <View style={{...styles.orderContainer}}>
                <Text style={styles.order_no}>
                  Order No. : #{item.order_no}
                </Text>
                <FlatList
                  data={item.order_item}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{paddingTop: 20, paddingBottom: 4}}
                  showsVerticalScrollIndicator={false}
                  renderItem={data => (
                    <CartItem
                      item={data.item}
                      context="ongoing"
                      onPressBtn={() =>
                        navigation.navigate('TrackOrder', {
                          item: data.item,
                          customer: item.customer,
                        })
                      }
                    />
                  )}
                />
              </View>
            </>
          )}
        />
        {false && (
          <ErrorComp
            title="No Ongoing order yet"
            desc="You Don't have an ongoing order at this time"
            icon={require('../../../assets/icons/clipboard.png')}
          />
        )}
      </View>
    </MyContainer>
  );
};

export default OnGoing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  order_no: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    marginVertical: 12,
  },
  orderContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
});
