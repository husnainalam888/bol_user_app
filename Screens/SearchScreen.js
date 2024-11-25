import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Search from '../Components/DashboardComps/Search';
import RecentSearchList from '../Components/SearchScreenComps/RecentSearchList';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';
import Product from '../Components/DashboardComps/Product';
import FilterModal from '../Components/SearchScreenComps/FilterModal';
import CustomSlider from '../Components/SearchScreenComps/RangeSelectorComponent';
import {shoes} from '../DemoApiResponses/DashboardApis';
import MyContainer from '../Components/Common/MyContainer';
import Header from '../Components/Common/Header';
const SearchScreen = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [typing, setTyping] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [recentSearches, setRecentSearches] = useMMKVStorage(
    'recentSearches',
    mmkvStorage,
    [],
  );

  const [allProducts, setAllProducts] = useMMKVStorage(
    'allProducts',
    mmkvStorage,
    [],
  );
  const [products, setProducts] = useState(allProducts);

  // useEffect(() => {
  //   Keyboard.addListener('keyboardDidShow', () => {
  //     setTyping(true);
  //   });
  //   Keyboard.addListener('keyboardDidHide', () => {
  //     setTyping(false);
  //   });
  // }, []);

  const handleTextChange = text => {
    if (text.trim().length == 0) {
      setProducts(allProducts);
      return;
    }
    let filtered = allProducts;
    filtered = filtered.filter(x =>
      x.name?.toLowerCase().includes(text?.toLocaleLowerCase()),
    );
    setProducts(filtered);
    setShowResult(true);
  };

  const handleSubmit = () => {
    if (searchText != '') {
      setRecentSearches([
        ...recentSearches,
        {id: recentSearches.length, text: searchText},
      ]);
      handleTextChange(searchText);
    }
  };

  const onPressRecentOption = item => {
    // setSearchText(item.text);
    handleTextChange(item.text);
    setTyping(false);
  };

  const onPressFilter = () => {
    setShowFilter(true);
  };

  const handleFilter = options => {
    let filtered = allProducts;
    if (options.cat.id != false && options.cat.id != -1) {
      filtered = filtered.filter(x => x.category_id == options.cat.id);
    }
    if (options.rating.id != false && options.rating.rating != 'All')
      filtered = filtered.filter(
        x => x.average_rating >= options.rating.rating,
      );
    if (options.sortBy.id != false) {
      switch (options.sortBy.name) {
        case 'Price Low to High':
          filtered = filtered.sort(
            (a, b) => parseFloat(a.sales_price) - parseFloat(b.sales_price),
          );
          break;
        case 'Price High to Low':
          filtered = filtered.sort(
            (a, b) => parseFloat(b.sales_price) - parseFloat(a.sales_price),
          );
          break;
      }
    }
    if (options.price.id != false) {
      filtered = filtered.filter(
        x =>
          x.sales_price >= options.price.lowPrice &&
          x.sales_price <= options.price.highValue,
      );
    }
    setProducts(filtered);
  };

  return (
    <View style={[styles.container, {paddingHorizontal: 0, paddingTop: 0}]}>
      <Header
        title="Search"
        showSearch={false}
        style={{marginTop: -16, paddingBotom: 0}}
      />
      <ScrollView
        style={[styles.container, {flex: 0, paddingTop: 0}]}
        keyboardShouldPersistTaps={'handled'}>
        <Search
          style={{marginTop: 8}}
          showFilter={false}
          onPressFilter={onPressFilter}
          value={searchText}
          onChangeText={text => {
            setSearchText(text);
            if (showResult) setShowResult(false);
          }}
          onSubmit={handleSubmit}
        />
        <MyContainer
          networkError={products.length == 0}
          imageSource={require('../assets/noDatalarge.png')}
          message={'No Products'}
          buttonText={'Remove Filter & Search'}
          onPressBtn={() => {
            setSearchText('');
            setProducts(allProducts);
            setShowFilter(false);
          }}>
          <View style={styles.recentTxtContainer}>
            <Text style={styles.recentTxt}>
              {
                // typing && searchText.length == 0 && recentSearches.length > 0
                // ? 'Recent'
                // :
                searchText.length == 0
                  ? 'All Products'
                  : showResult && products.length > 0
                  ? 'Results for ' + '"' + searchText + '"'
                  : ''
              }
            </Text>
            {/* <TouchableOpacity onPress={() => setRecentSearches([])}>
              <Text style={[styles.clearAll]}>
                {
                  // typing && searchText.length == 0 && recentSearches.length > 0
                  // ? 'Clear All'
                  //   :
                  searchText.length != 0 ? `${products.length} found` : ''
                }
              </Text>
            </TouchableOpacity> */}
          </View>
          {/* {typing && searchText.length == 0 && recentSearches.length > 0 && (
            <>
              <View style={styles.line} />
              <RecentSearchList
                recentSearches={recentSearches}
                onPress={onPressRecentOption}
              />
              <View style={{height: 20}} />
            </>
          )} */}

          <FlatList
            keyExtractor={item => item.id}
            numColumns={2}
            showVerticalScrollIndicator={false}
            data={products}
            renderItem={({item}) => <Product item={item} />}
          />
        </MyContainer>
      </ScrollView>
      {showFilter && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setShowFilter(false)}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: '#00000022',
          }}
        />
      )}

      <FilterModal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onPressApply={obj => handleFilter(obj)}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  recentTxtContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  recentTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  clearAll: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#f4f4f4',
    marginBottom: 5,
  },
});
