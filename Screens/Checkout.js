import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Common/Header';
import {Colors} from '../Utils/Colors';
import AddressComp from '../Components/CheckoutComponents/AddressComp';
import CartItem from '../Components/CartScreenComps/CartItem';
import ButtonWithTwoIcons from '../Components/Common/ButtonWithTwoIcons';
import RemoveFromCart from '../Components/CartScreenComps/RemoveFromCartModal';
import TextCats from '../Components/DashboardComps/TextCats';
import DiscountFlatList from '../Components/CheckoutComponents/DiscountList';
import {shoes} from '../DemoApiResponses/DashboardApis';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {convertItemListToJSON, log, mmkvStorage} from '../Utils/Modules';
import {getRequest, postRequest} from '../Utils/API';
import {useCustomAlert} from '../Components/Common/AlertProvider';
import MyContainer from '../Components/Common/MyContainer';
import RoundedButton from '../Components/Common/RoundedButton';

const Checkout = ({navigation, route}) => {
  const totalAmount = route.params?.totalAmount ?? 0;
  const [inputVisible, setInputVisible] = useState(true);
  const showAlert = useCustomAlert();
  const [inputText, setInputText] = useState('');
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cartList, setCart] = useMMKVStorage('cartList', mmkvStorage, []);
  const [addresses, setAddress] = useMMKVStorage('address', mmkvStorage, []);
  const [isError, setIsError] = useState(false);
  const [selectedAddress, setSelectedAddress] = useMMKVStorage(
    'selectedAddress',
    mmkvStorage,
    null,
  );
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);

  React.useEffect(() => {
    fetchAddress();
    if (addresses.length > 0 && selectedAddress?.id == undefined) {
      setSelectedAddress(addresses[0]);
    }
  }, []);

  const fetchAddress = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest('get_address/' + user.id);
      setIsLoading(false);
      setAddress(response.data);
    } catch (e) {
      console.log('Eror:', e);
      setIsLoading(false);
    }
  };
  const handleCheckout = async () => {
    try {
      if (selectedAddress == null) {
        showAlert(
          'Please select a shipping address to proceed',
          'Error Occured',
        );
        return;
      }
      setIsLoading(true);
      // const cartList = convertItemListToJSON(cartList);
      const product_ids = convertItemListToJSON(cartList);
      const formData = new FormData();
      formData.append('customer_address', selectedAddress.id);
      formData.append('total', totalAmount);
      formData.append('product_id', JSON.stringify(product_ids));
      // log.info('formData', formData);
      setIsLoading(true);
      const response = await postRequest(
        `checkout/${user.id}`,
        formData,
        false,
      );
      setIsLoading(false);

      log.info('Checkout Response :', JSON.stringify(response, null, 2));
      if (response.message == 'success') {
        showAlert(
          'Order Placed Successfully',
          'success',
          require('../assets/icons/tick_f.png'),
        );
        setCart([]);
        navigation.navigate('BottomTabs', {screen: 'Home'});
      } else
        showAlert(
          'Something went wrong. Please try again later. ' + response.message,
          'Error Occured',
        );
    } catch (e) {
      console.log('Eror:', e);
      setIsLoading(false);
      showAlert(
        'Something went wrong. Please try again later.',
        'Error Occured',
      );
    }
  };

  return (
    <MyContainer isLoading={isLoading}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#f3f3f3'}}>
        <Header title="Checkout" showSearch={false} style={{marginTop: -16}} />
        <ScrollView style={{flex: 1, paddingHorizontal: 20, marginTop: 8}}>
          <View
            style={{height: 1, width: '100%', backgroundColor: '#e7e7e7'}}
          />
          <Text style={styles.heading}>Shipping Address</Text>
          {selectedAddress ? (
            <AddressComp
              onPress={() => navigation.navigate('ShippingAddress')}
              item={selectedAddress}
            />
          ) : (
            <RoundedButton
              style={{backgroundColor: 'gray'}}
              title={'Select Shipping Address'}
              titleStyle={{color: 'white'}}
              onPress={() => navigation.navigate('ShippingAddress')}
            />
          )}

          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#e7e7e7',
              marginBottom: 16,
            }}
          />
          <Text style={[styles.heading, {marginTop: 0}]}>Order List</Text>
          <FlatList
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            data={cartList}
            renderItem={({item}) => <CartItem context="checkout" item={item} />}
          />
          <View
            style={{height: 1, width: '100%', backgroundColor: '#e7e7e7'}}
          />

          {/* <Text style={styles.heading}>Chose Shipping</Text>
        <ButtonWithTwoIcons
          onPress={() => navigation.navigate('ShippingType')}
          startIcon={require('../assets/icons/truck.png')}
          title={'Choose Shipping Type'}
          endIcon={require('../assets/icons/arrow_right.png')}
        /> */}
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#e7e7e7',
            }}
          />
          {/* <Text style={styles.heading}>Promo Code</Text>
        <View style={styles.row}>
          {inputVisible && (
            <>
              <TextInput
                onChangeText={text => setInputText(text)}
                placeholder="Enter Promo Code"
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => {
                  if (inputText.trim() != '') {
                    setInputVisible(false);
                    setDiscounts([...discounts, inputText]);
                  }
                }}>
                <Text style={styles.addBtn}>+</Text>
              </TouchableOpacity>
            </>
          )}
        </View> */}
          {!inputVisible && (
            <DiscountFlatList
              style={{marginBottom: 16}}
              data={discounts}
              onRemovePress={data => {
                setDiscounts(data);
                if (data.length == 0) {
                  setInputVisible(true);
                }
              }}
              onAddPress={() => {
                setInputVisible(true);
                setInputText('');
              }}
            />
          )}
          <View
            style={{
              backgroundColor: 'white',
              paddingTop: 16,
              paddingHorizontal: 16,
              borderRadius: 16,
              marginBottom: 16,
              marginTop: 16,
            }}>
            {/* <View style={styles.row}>
            <Text style={{fontSize: 16}}> Amount </Text>
            <Text style={{fontSize: 16, color: 'black'}}> $445.00 </Text>
          </View>
          <View style={styles.row}>
            <Text style={{fontSize: 16}}> Shipping </Text>
            <Text style={{fontSize: 16, color: 'black'}}> $445.00 </Text>
          </View> */}
            {/* <View style={styles.row}>
            <Text style={{fontSize: 16}}> Promo </Text>
            <Text style={{fontSize: 16, color: 'black'}}> - $445.00 </Text>
          </View> */}
            {/* <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#e7e7e7',
              marginBottom: 16,
            }}
          /> */}
            <View style={[styles.row]}>
              <Text style={{fontSize: 16, color: 'gray'}}> Total </Text>
              <Text style={{fontSize: 16, color: 'black'}}>
                {' '}
                ${totalAmount}{' '}
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.priceCartView}>
          <TouchableOpacity
            onPress={() => handleCheckout()}
            style={styles.cartBtn}>
            <Text style={styles.cartText}>Continue to payment</Text>
            <Image
              style={styles.cartIcon}
              source={require('../assets/icons/next.png')}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </MyContainer>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 16,
  },
  priceCartView: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  cartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 100,
    flex: 1,
    justifyContent: 'center',
    elevation: 4,
  },
  cartIcon: {
    height: 16,
    width: 16,
  },
  cartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fafafa',
    flex: 1,
    marginEnd: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addBtn: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'black',
    padding: 5,
    borderRadius: 30,
    height: 45,
    width: 45,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 22,
  },
});
