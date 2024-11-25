import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../../Utils/Modules';
const QuantitySelector = props => {
  const [cartList, setCartList] = useMMKVStorage('cartList', mmkvStorage, []);
  const [quantity, setQuantity] = useState(
    cartList.find(x => x.id == props.item.id)?.quantity || 1,
  );
  const item = props.item;
  React.useEffect(() => {
    setQuantity(cartList.find(x => x.id == props.item.id)?.quantity || 1);
  }, [cartList]);
  const handleDecrement = () => {
    if (quantity > 1) {
      item.quantity--;
      const index = cartList.findIndex(x => x.id == item.id);
      let tempCart = cartList;
      tempCart[index] = item;
      setCartList(tempCart);
      setQuantity(item.quantity);
    }
  };

  const handleIncrement = () => {
    item.quantity++;
    const index = cartList.findIndex(x => x.id == item.id);
    let tempCart = cartList;
    tempCart[index] = item;
    setCartList(tempCart);
    setQuantity(item.quantity);
    setQuantity(item.quantity);
  };

  return (
    <View
      style={[
        styles.container,
        props.disable && {justifyContent: 'space-between'},
        props.style,
      ]}>
      <Text style={styles.heading}>{props.label || 'Quantity'}</Text>
      <View style={styles.quantityContainer}>
        {!props.disable && (
          <TouchableOpacity onPress={handleDecrement} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        )}
        <Text style={[styles.quantityText, props.disable && {padding: 5}]}>
          {quantity}
        </Text>
        {!props.disable && (
          <TouchableOpacity
            onPress={handleIncrement}
            style={[styles.button, props.buttonStyle]}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginEnd: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: 30,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 4,
    color: 'black',
  },
});

export default QuantitySelector;
