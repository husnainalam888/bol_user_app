import {
  Image,
  ImageBackground,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {formatNumber, log, mmkvStorage} from '../../Utils/Modules';
import {IMAGE_B_URL} from '../../Utils/API';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import Text from '../Text';
import DropShadow from 'react-native-drop-shadow';
const Product = props => {
  const [favList, setFavs] = useMMKVStorage('favList', mmkvStorage, []);
  const [isFav, setIsFav] = React.useState(
    favList.find(item => item.id === props.item.id) ? true : false,
  );
  const navigation = useNavigation();
  const item = props.item;
  React.useEffect(() => {
    // console.log('item : ', item.product_image[0].image);
    setIsFav(favList.find(item => item.id === props.item.id) ? true : false);
  }, [favList]);

  const handleFav = () => {
    const alreadyHave = favList.find(item => item.id === props.item.id);
    if (alreadyHave) {
      setIsFav(false);
      setFavs(favList.filter(item => item.id !== props.item.id));
    } else {
      setIsFav(true);
      setFavs([...favList, props.item]);
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('ProductOverview', {item});
      }}
      style={{
        flex: 1 / 2,
        marginHorizontal: 8,
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#f9f9f9',
        elevation: 2,
      }}>
      <ImageBackground
        style={styles.image}
        resizeMode="center"
        source={
          // item.product_images
          //   ?
          item?.product_image[0]?.image
            ? {uri: IMAGE_B_URL + item?.product_image[0]?.image}
            : require('../../assets/icons/no.png')
        }>
        <TouchableOpacity
          onPress={handleFav}
          style={{
            backgroundColor: 'black',
            alignSelf: 'flex-end',
            margin: 15,
            padding: 5,
            borderRadius: 15,
            overflow: 'hidden',
          }}>
          <Image
            resizeMode="center"
            style={styles.heart}
            source={
              isFav
                ? require('../../assets/icons/heartFilWhite.png')
                : require('../../assets/icons/whiteHeart.png')
            }
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={{paddingHorizontal: 10}}>
        <Text numberOfLines={1} style={styles.name}>
          {item?.name}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={styles.rating}
            source={require('../../assets/icons/rating.png')}
          />
          <Text style={styles.ratingText}>
            {parseFloat(item?.average_rating).toFixed(1)} l
          </Text>
          <Text style={styles.sold}>
            {formatNumber(item?.stock_quantity)} Stock
          </Text>
        </View>
        <Text style={styles.name}>
          ${parseInt(item?.sales_price).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  image: {
    height: 180,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  heart: {
    height: 16,
    width: 16,
    alignSelf: 'flex-end',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginTop: 8,
    marginBottom: 4,
  },
  rating: {
    height: 16,
    width: 16,
  },
  ratingText: {
    fontSize: 14,
    marginHorizontal: 5,
    paddingTop: 4,
    color: 'gray',
  },
  sold: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingTop: 8,
    borderRadius: 5,
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
  shadow: {
    flex: 1 / 2,
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
