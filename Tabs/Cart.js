import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Components/Common/Header';
import CartItem from '../Components/CartScreenComps/CartItem';
import RemoveFromCart from '../Components/CartScreenComps/RemoveFromCartModal';
import {shoes} from '../DemoApiResponses/DashboardApis';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';
import MyContainer from '../Components/Common/MyContainer';

const Cart = ({navigation}) => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [itemToDel, setItemToDel] = useState({});
  const [cartList, setCartList] = useMMKVStorage('cartList', mmkvStorage, []);
  const [totalAmount, setTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartList.map(item => {
      total += item.sales_price * item.quantity;
    });

    setTotal(total);
  }, [cartList]);
  return (
    <MyContainer
      networkError={cartList.length == 0}
      onPressBtn={() => navigation.navigate('Home')}
      message={'Your cart is empty. Please add some products'}
      buttonText={'Go Home'}
      imageSource={require('../assets/noDatalarge.png')}>
      <SafeAreaView style={styles.container}>
        <Header
          title="My Cart"
          hideBack={true}
          showSearch={false}
          style={{marginTop: -16, paddingBottom: 8}}
        />
        <View style={styles.subContainer}>
          <FlatList
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            data={cartList}
            renderItem={({item}) => (
              <CartItem
                item={item}
                context="cart"
                onDelete={() => {
                  setItemToDel(item);
                  setShowRemoveModal(true);
                }}
              />
            )}
          />
        </View>
        <View style={styles.priceCartView}>
          <View>
            <Text style={styles.priceHeading}>Total Price</Text>
            <Text style={styles.price}>
              ${parseInt(totalAmount).toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Checkout', {totalAmount})}
            style={styles.cartBtn}>
            <Text style={styles.cartText}>Checkout</Text>
            <Image
              style={styles.cartIcon}
              source={require('../assets/icons/next.png')}
            />
          </TouchableOpacity>
        </View>
        {showRemoveModal && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: '#00000068',
            }}
          />
        )}
        <RemoveFromCart
          onPressRemove={() =>
            setCartList(cartList.filter(item => item.id !== itemToDel.id))
          }
          item={itemToDel}
          visible={showRemoveModal}
          onClose={() => setShowRemoveModal(false)}
        />
      </SafeAreaView>
    </MyContainer>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'space-between',
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f3f3f3',
  },
  priceCartView: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  priceHeading: {
    fontSize: 12,
    color: 'gray',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  cartBtn: {
    marginStart: 20,
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
});
