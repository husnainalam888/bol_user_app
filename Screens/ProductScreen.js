import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import Header from '../Components/Common/Header';
import TextCats from '../Components/DashboardComps/TextCats';
import Product from '../Components/DashboardComps/Product';
import {mostPopular} from '../DemoApiResponses/DashboardApis';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';
import MyContainer from '../Components/Common/MyContainer';
import {useNavigation} from '@react-navigation/native';

const ProductScreen = props => {
  const navigation = useNavigation();
  const [cats, setCats] = useMMKVStorage('cats', mmkvStorage, []);
  const [products, setProducts] = React.useState(props.products);
  const [filtered, setFiltereProducts] = React.useState(props.products);
  const [searchText, setSearchText] = React.useState('');
  React.useEffect(() => {
    setProducts(props.products);

    return () => {};
  }, [props.products]);

  const handleSearch = text => {
    setSearchText(text);
    let temp = props.products;
    temp = temp.filter(x =>
      x.name?.toLowerCase()?.includes(text?.toLowerCase()),
    );
    console.warn('Filtered :', temp);
    setFiltereProducts(temp);
  };

  return (
    <SafeAreaView style={[styles.container, {paddingTop: 0}]}>
      <Header
        style={{marginTop: -16}}
        title={props.title}
        onChangeText={text => setSearchText(text)}
        onSubmit={() => handleSearch(searchText)}
        searchText={searchText}
        showFilter={false}
        searchStyle={{backgroundColor: '#f5f5f5'}}
      />
      <MyContainer
        networkError={products.length == 0 && searchText.length > 0}
        imageSource={require('../assets/noDatalarge.png')}
        message={'No products found'}
        buttonText={'Remmove Filter & Search'}
        onPressBtn={() => {
          setProducts(props.products);
          setSearchText('');
        }}>
        <View style={styles.subContainer}>
          {/* {props.title == 'Most Popular' && <TextCats data={cats} />} */}
          <FlatList
            keyExtractor={item => item.id}
            style={{marginTop: 10}}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={filtered}
            extraData={filtered}
            renderItem={({item}) => <Product item={item} />}
          />
        </View>
      </MyContainer>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    paddingHorizontal: 20,
  },
});
