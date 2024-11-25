import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DashboardHeader from '../Components/DashboardComps/DashboardHeader';
import Search from '../Components/DashboardComps/Search';
import ImageSlider from '../Components/DashboardComps/Slider';
import Cats from '../Components/Cats';
import TextCats from '../Components/DashboardComps/TextCats';
import Product from '../Components/DashboardComps/Product';
import {mostPopular, offers} from '../DemoApiResponses/DashboardApis';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {log, mmkvStorage} from '../Utils/Modules';
import {getRequest} from '../Utils/API';
import ContainerView from '../Components/Common/ContainerView';
import MyContainer from '../Components/Common/MyContainer';
import {initSocket, startListeningForLocationUpdates} from '../socket/socket';

const Dashboard = ({navigation}) => {
  const [userData, setUserData] = useMMKVStorage('userData', mmkvStorage, null);
  const [riderLocations, setRiderLocations] = useMMKVStorage(
    'riderLocations',
    mmkvStorage,
    [],
  );
  const tag = 'Dashboard.js';
  const [dashboardApiResponse, setDashboardApiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [forceLoading, setForceLoaing] = useState(false);
  const [selectedTag, setSelectedTag] = useState({id: -1, name: 'All'});
  const [allProducts, setAllProducts] = useMMKVStorage(
    'allProducts',
    mmkvStorage,
    [],
  );
  const [productList, setProducts] = useState(allProducts);
  const [cats, setCats] = useMMKVStorage('cats', mmkvStorage, []);
  useEffect(() => {
    initSocket(setRiderLocations);
    console.warn('Dashboard', 'Rider locations :', riderLocations);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest('customer_dashboard');
      setIsLoading(false);
      if (setForceLoaing) {
        setForceLoaing(false);
      }
      console.log('Dashoboard :', JSON.stringify(response));
      const res = response.data;
      setDashboardApiResponse(res);
      setCats(res.categories);
      let products = [];
      res.products.forEach(element => {
        if (element.product) element.product.forEach(i => products.push(i));
      });
      console.log('Produts :', products);
      setProducts(products);
      setAllProducts(products);
      setIsError(false);
    } catch (e) {
      console.log('Error : ', e);
      setIsLoading(false);
      setIsError(true);
      if (setForceLoaing) {
        setForceLoaing(false);
      }
    }
  };

  const handleFilterByTag = tag => {
    try {
      if (tag.id == -1) {
        setProducts(allProducts);
      }
      const filtered = dashboardApiResponse.products.find(item => {
        if (item.id == tag.id) {
          return item;
        }
      }).product;
      log.info('filtered :', filtered);
      setProducts(filtered);
    } catch (e) {
      console.log('Error : ', e);
    }
  };

  return (
    <MyContainer
      isLoading={
        (isLoading && dashboardApiResponse?.products?.length == 0) ||
        forceLoading
      }
      networkError={isError}
      onPressBtn={() => {
        setForceLoaing(true);
        fetchData();
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={fetchData}
            colors={['#000000', '#000000']}
            progressBackgroundColor="#fff"
          />
        }>
        <SafeAreaView style={styles.container}>
          <DashboardHeader />
          <Search
            clickable={true}
            onPress={() => navigation.navigate('SearchScreen')}
          />
          {/* <View style={styles.sectionHeader}>
            <Text style={styles.offer}>Special Offers</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SpecialOffers')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View> */}
          <ImageSlider borderWidth={1} />
          <Cats
            data={[...cats]}
            onSelect={selected => {
              navigation.navigate('MostPopular', {
                title: selected.name,
                item: selected,
              });
            }}
          />
          <View style={{...styles.sectionHeader, marginBottom: 0}}>
            <Text style={styles.offer}>Most Popular</Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MostPopular', {title: 'Most Popular'})
              }>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <TextCats
            data={cats}
            selected={selectedTag}
            onSelect={selected => {
              handleFilterByTag(selected);
              setSelectedTag(selected);
            }}
          />
          <MyContainer
            networkError={productList.length == 0 && !isLoading}
            imageSource={require('../assets/noDatalarge.png')}
            message={'No Products'}
            buttonText={'Show All'}
            onPressBtn={() => {
              setProducts(allProducts);
              setSelectedTag({id: -1, name: 'All'});
            }}>
            <FlatList
              data={productList}
              style={styles.productList}
              numColumns={2}
              renderItem={({item}) => <Product item={item} />}
              keyExtractor={(item, index) => index.toString()} // Use toString() to convert index to string
            />
          </MyContainer>
        </SafeAreaView>
      </ScrollView>
    </MyContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  offer: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  seeAll: {
    fontSize: 16,
    fontFamily: 'Poppins-Light',
    color: 'black',
  },
  productList: {
    marginHorizontal: -10,
    marginVertical: 10,
  },
});
