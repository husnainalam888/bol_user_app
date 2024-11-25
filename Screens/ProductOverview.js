import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Touchable,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ImageSlider from '../Components/DashboardComps/Slider';
import SizesSelector from '../Components/ProductOverviewComps/SizeSelector';
import ColorSelector from '../Components/ProductOverviewComps/ColorSelector';
import QuantitySelector from '../Components/ProductOverviewComps/QuantitySelector';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {formatNumber, mmkvStorage} from '../Utils/Modules';
import Header from '../Components/Common/Header';
import Shadow from '../Components/Shadow';
import RenderHTML from 'react-native-render-html';
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
const ProductOverview = ({navigation, route}) => {
  const item = route.params.item;
  const [desLine, setDesLines] = React.useState(1);
  const [favList, setFavs] = useMMKVStorage('favList', mmkvStorage, []);
  const [cartList, setCart] = useMMKVStorage('cartList', mmkvStorage, []);
  const [selectedColor, setSelectedColor] = React.useState(
    JSON.parse(item?.colors)[0],
  );

  const [isFav, setIsFav] = React.useState(
    favList.find(x => x.id == item.id) ? true : false,
  );
  const images = item.product_image;
  React.useEffect(() => {}, []);
  const handleFav = () => {
    const alreadyHave = favList.find(x => x.id === item.id);
    if (alreadyHave) {
      setIsFav(false);
      setFavs(favList.filter(x => x.id !== item.id));
    } else {
      setIsFav(true);
      item.color = selectedColor;
      setFavs([...favList, item]);
    }
  };

  const handleAdToCart = () => {
    let tempCart = [...cartList];
    const alreadyHave = tempCart.find(x => x.id == item.id);
    if (alreadyHave) {
      alreadyHave.quantity++;
      const index = tempCart.findIndex(x => x.id == item.id);
      tempCart[index] = alreadyHave;
      setCart(tempCart);
    } else {
      item.quantity = 1;
      item.color = selectedColor;
      tempCart.push(item);
      setCart(tempCart);
    }
    navigation.navigate('Cart');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Shadow style={styles.shadow}>
        <Header
          title="Product Overview"
          showSearch={false}
          style={{
            paddingTop: 0,
            marginTop: -16,
            paddingBottom: 8,
            backgroundColor: 'white',
          }}
        />
      </Shadow>
      <ScrollView style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
        <ImageSlider
          data={images}
          style={{height: SCREEN_HEIGHT * 0.4}}
          renderItemStyle={{borderRadius: 0, height: SCREEN_HEIGHT * 0.4}}
        />
        <View style={styles.subContainer}>
          <View style={styles.nameContainer}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => {
                setDesLines(desLine == 1 ? 100 : 1);
              }}>
              <Text numberOfLines={desLine} style={styles.name}>
                {item?.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{alignSelf: 'flex-start'}}
              onPress={() => {
                handleFav();
              }}>
              <Image
                resizeMode="contain"
                style={styles.heart}
                source={
                  !isFav
                    ? require('../assets/icons/cuteHeart.png')
                    : require('../assets/icons/cuteHeartFil.png')
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.sold}>
              {formatNumber(item?.stock_quantity)} Stock
            </Text>
            <Image
              style={styles.rating}
              source={require('../assets/icons/rating.png')}
            />
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.ratingText}>
                {parseFloat(item?.average_rating).toFixed(1)} (
                {item?.total_product_reviews} reviews)
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.line} />
          <Text style={styles.descriptionHeading}>Description</Text>
          {/* <Text numberOfLines={desLine} style={styles.description}>
              {item?.description}
            </Text> */}
          <RenderHTML
            contentWidth={SCREEN_WIDTH - 48}
            baseStyle={styles.description}
            source={{html: item?.description}}
          />
          <View style={styles.selectors}>
            {item?.sizes && <SizesSelector />}
            {item?.colors && (
              <ColorSelector data={item.colors} onSelect={setSelectedColor} />
            )}
          </View>
          <View style={styles.line} />
        </View>
      </ScrollView>
      <View style={styles.priceCartView}>
        <View>
          <Text style={styles.priceHeading}>Total Price</Text>
          <Text style={styles.price}>
            ${parseInt(item?.sales_price).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity onPress={handleAdToCart} style={styles.cartBtn}>
          <Image
            style={styles.cartIcon}
            source={require('../assets/icons/cartWhite.png')}
          />
          <Text style={styles.cartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    paddingHorizontal: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  heart: {
    height: 24,
    width: 24,
    marginHorizontal: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sold: {
    fontSize: 14,
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f4f4f4',
    marginEnd: 10,
  },
  rating: {
    height: 16,
    width: 16,
  },
  ratingText: {
    marginHorizontal: 5,
    fontSize: 16,
    color: 'gray',
  },
  line: {
    height: 1,
    backgroundColor: '#f4f4f4',
    marginTop: 15,
  },
  descriptionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: 'black',
  },
  selectors: {
    flexDirection: 'row',
  },
  priceCartView: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 20,
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
    marginLeft: 5,
  },
  shadow: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightGray',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
