import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductScreen from './ProductScreen';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';
import MyContainer from '../Components/Common/MyContainer';
import Header from '../Components/Common/Header';
const WishList = ({navigation}) => {
  const [favList, setFavList] = useMMKVStorage('favList', mmkvStorage, []);
  return (
    <MyContainer
      networkError={favList.length == 0}
      imageSource={require('../assets/noDatalarge.png')}
      message={'You have no products in wishlist'}
      buttonText={'Back to Home'}
      onPressBtn={() => {
        navigation.goBack();
      }}>
      <View style={styles.container}>
        <ProductScreen title="My WishList" products={favList} />
      </View>
    </MyContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default WishList;
