import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState} from 'react';
import ErrorComp from '../../../Components/Common/ErrorComp';
import CartItem from '../../../Components/CartScreenComps/CartItem';
import LeaveReviewModal from '../../../Components/ReviewsComps/LeaveReviewModal';
import {shirts} from '../../../DemoApiResponses/DashboardApis';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {log, mmkvStorage} from '../../../Utils/Modules';
import MyContainer from '../../../Components/Common/MyContainer';
import {getRequest} from '../../../Utils/API';

const Completed = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const [itemToReview, setItemToReview] = useState({});
  const [orders, setOrder] = useMMKVStorage('orders', mmkvStorage, []);
  const [completedOrders, setCompletedOrders] = useState(orders);
  const [isLoading, setIsLoading] = useState(false);
  React.useEffect(() => {
    if (orders?.length > 0) {
      const filtered = orders.filter(
        x =>
          x?.order_item?.[0]?.status == 'completed' &&
          x?.order_item?.length > 0,
      );
      setCompletedOrders(filtered);
    }
  }, [orders]);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest(`get_customer_orders/${user.id}`);
      setIsLoading(false);
      log.info('Orders :', JSON.stringify(response, null, 2));
      const res = response.data;
      setOrder(res);
    } catch (e) {
      console.log('Error : ', e);
      setIsLoading(false);
    }
  };
  return (
    <MyContainer
      isLoading={isLoading}
      networkError={completedOrders.length == 0}
      imageSource={require('../../../assets/noDatalarge.png')}
      message={'You have no completed orders'}
      buttonText={'Refresh'}
      onPressBtn={() => fetchData()}>
      <View style={styles.container}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
          }
          showsVerticalScrollIndicator={false}
          data={completedOrders}
          extraData={orders}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <>
              <View style={{...styles.orderContainer}}>
                <Text style={styles.order_no}>
                  Order No. : #{item.order_no}
                </Text>
                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={isLoading}
                      onRefresh={fetchData}
                    />
                  }
                  keyExtractor={item => item.id}
                  contentContainerStyle={{paddingTop: 20, paddingBottom: 4}}
                  showsVerticalScrollIndicator={false}
                  data={item?.order_item?.length > 0 ? item?.order_item : []}
                  renderItem={({item}) => (
                    <CartItem
                      item={item}
                      onPress={() =>
                        navigation.navigate('TrackOrder', {
                          item,
                          customer: item.customer,
                        })
                      }
                      context="completed"
                      onPressBtn={() => {
                        setItemToReview(item);
                        setShowModal(true);
                      }}
                    />
                  )}
                />
              </View>
            </>
          )}
        />
        {false && (
          <ErrorComp
            title="No Completed order yet"
            desc="You Don't have any completed order at this time"
            icon={require('../../../assets/icons/clipboard.png')}
          />
        )}
        <LeaveReviewModal
          item={itemToReview}
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
      </View>
    </MyContainer>
  );
};

export default Completed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  order_no: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 16,
  },
  orderContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 24,
    paddingHorizontal: 16,
  },
});
