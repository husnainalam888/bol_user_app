import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import QuantitySelector from '../ProductOverviewComps/QuantitySelector';
import RoundedButton from '../Common/RoundedButton';
import {IMAGE_B_URL} from '../../Utils/API';

const CartItem = props => {
  const item = props?.item;
  const [isCart, setIsCart] = useState(props.context == 'cart');
  const [isCheckout, setChekout] = useState(props.context == 'checkout');
  const [btnText, setBtnText] = useState(
    props.context == 'ongoing' ? 'Track Order' : 'Leave Review',
  );
  const [isTrackOrReview, setTrackOrReview] = useState(
    props.context != 'track' && props.context != 'review',
  );
  const [showQSelector, setShowQSelector] = React.useState(
    props.context == 'cart' ||
      props.context == 'checkout' ||
      props.context == 'remove'
      ? true
      : false,
  );

  const [showBtn, setShowBtn] = React.useState(
    props?.context == 'ongoing' ||
      props?.context == 'completed' ||
      props?.context == 'track'
      ? true
      : false,
  );

  const [showStatusLabel, setShowStatusLabel] = React.useState(
    props?.context == 'ongoing' || props?.context == 'completed' ? true : false,
  );
  const [statusText, setText] = useState(
    props.context == 'ongoing' ? 'In Delivery' : 'Completed',
  );
  // const [images, setImages] = React.useState(
  //   props?.context != 'cart' &&
  //     props?.context != 'checkout' &&
  //     props.context != 'remove'
  //     ? JSON.parse(item?.product?.images)?.map(item => IMAGE_B_URL + item)
  //     : JSON.parse(item?.images)?.map(item => IMAGE_B_URL + item),
  // );
  React.useEffect(() => {
    // console.log(item.product_image);
    // try {
    //   let temp =
    //     props?.context != 'cart' &&
    //     props?.context != 'checkout' &&
    //     props.context != 'remove'
    //       ? JSON.parse(item?.product?.images)?.map(item => IMAGE_B_URL + item)
    //       : JSON.parse(item?.images)?.map(item => IMAGE_B_URL + item);
    //   setImages([]);
    // } catch (error) {
    //   console.error(error);
    // }
  }, [props.context]);
  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      <Image
        style={styles.image}
        resizeMode="center"
        source={
          item?.product_image[0]?.image
            ? {uri: IMAGE_B_URL + item?.product_image[0]?.image}
            : item?.product_image != null && item?.product_image != ''
            ? {uri: IMAGE_B_URL + item?.product_image}
            : require('../../assets/icons/no.png')
        }
      />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.title}>
            {item?.name}
          </Text>
          {isCart && (
            <TouchableOpacity onPress={props.onDelete}>
              <Image
                style={styles.deleteIcon}
                source={require('../../assets/icons/bin.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={[styles.row, styles.colorSizeRow]}>
          {/* <View
            style={[
              styles.colorDot,
              item?.color && {backgroundColor: item.color},
            ]}
          /> */}
          {/* <Text style={styles.colorSizeText}>
            {props.context == 'ongoing' ||
            props.context == 'completed' ||
            props.context == 'cart'
              ? `Qty = ${item?.quantity || 1}`
              : ''}
          </Text> */}
          <Text style={styles.colorSizeText}>
            {`Qty = ${item?.quantity || 1}`}
          </Text>
        </View>
        {showStatusLabel && (
          <Text
            style={{
              backgroundColor: '#f4f4f4',
              alignSelf: 'flex-start',
              paddingHorizontal: 5,
              paddingVertical: 4,
              fontSize: 12,
              borderRadius: 20,
              lineHeight: 14,
              color: 'gray',
            }}>
            {statusText}
          </Text>
        )}
        {showQSelector && (
          <QuantitySelector
            item={item}
            disable={isCheckout}
            label={
              '$' + (item?.sales_price * item?.quantity).toFixed(2) || '$345.00'
            }
            quantity={item?.quantity || 1}
            style={{
              marginVertical: 0,
            }}
          />
        )}
        {showBtn && (
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>
              {'$' + parseInt(item?.price * item.quantity).toFixed(2) ||
                '$345.00'}
            </Text>
            {isTrackOrReview && (
              <RoundedButton
                onPress={props.onPressBtn}
                title={btnText}
                style={styles.trackOrderButton}
                titleStyle={styles.trackOrderText}
              />
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 20,
  },
  image: {
    height: 100,
    width: 100,
    marginEnd: 10,
    backgroundColor: '#e2e2e2',
    borderRadius: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    marginEnd: 10,
    flex: 1,
  },
  deleteIcon: {
    height: 24,
    width: 24,
  },
  colorSizeRow: {
    justifyContent: 'flex-start',
  },
  colorDot: {
    height: 12,
    width: 12,
    borderRadius: 16,
    backgroundColor: '#a2a2a2',
  },
  colorSizeText: {
    color: 'gray',
    fontFamily: 'Poppins-Regular',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  trackOrderButton: {
    paddingVertical: 8,
  },
  trackOrderText: {
    fontSize: 12,
    marginHorizontal: 0,
    fontFamily: 'Poppins-Regular',
  },
});
