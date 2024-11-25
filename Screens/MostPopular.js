import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import ProductScreen from './ProductScreen';
import {getRequest} from '../Utils/API';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';
import MyContainer from '../Components/Common/MyContainer';
import Header from '../Components/Common/Header';

const MostPopular = ({route, navigation}) => {
  const {item, title} = route.params;
  const [allProducts, setAllProducts] = useMMKVStorage(
    'allProducts',
    mmkvStorage,
    [],
  );
  const [products, setProducts] = useState(
    title == 'Most Popular' ? allProducts : [],
  );
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (title !== 'Most Popular') fetchData();
    else setIsLoading(false);
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest('get_category_products/' + item.id);
      setIsLoading(false);
      if (response.message == 'success') setProducts(response.data);
      console.log('Products Response  :', response);
    } catch (e) {
      console.log('Error : ', e);
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {!isLoading && products.length == 0 && (
        <Header title={title} showSearch={false} style={{marginTop: -16}} />
      )}
      <MyContainer
        isLoading={isLoading}
        networkError={products.length == 0 && !isLoading}
        message={'No products found'}
        imageSource={require('../assets/noDatalarge.png')}
        buttonText={'Back to Home'}
        onPressBtn={() => navigation.navigate('Home')}>
        <View style={styles.container}>
          <ProductScreen
            isLoading={isLoading}
            title={title}
            products={products}
          />
        </View>
      </MyContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default MostPopular;
