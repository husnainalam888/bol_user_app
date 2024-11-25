import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../Components/Common/Header';
import TopTabs from '../../Navigations/Top/TopTabs';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage, log} from '../../Utils/Modules';
import {getRequest} from '../../Utils/API';
import MyContainer from '../../Components/Common/MyContainer';
const Orders = ({navigation}) => {
  const [orders, setOrders] = useMMKVStorage('orders', mmkvStorage, []);
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    fetchData();
    return () => {};
  }, []);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest(`get_customer_orders/${user.id}`);
      setIsLoading(false);
      log.info('Orders :', JSON.stringify(response));
      const res = response.data;
      setOrders(res);
      setIsError(false);
    } catch (e) {
      console.log('Error : ', e);
      setIsLoading(false);
      setIsError(true);
    }
  };
  return (
    <MyContainer
      isLoading={isLoading}
      networkError={isError}
      buttonText={'Refresh'}
      onPressBtn={() => fetchData()}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#f8f8f8'}}>
        <Header title="My Orders" showSearch={false} style={{marginTop: -16}} />
        <View style={styles.subContainer}>
          <TopTabs />
        </View>
      </SafeAreaView>
    </MyContainer>
  );
};

export default Orders;

const styles = StyleSheet.create({
  subContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
