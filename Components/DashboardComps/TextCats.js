import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

const data = [
  {id: '1', name: 'All'},
  {id: '2', name: 'Shoes'},
  {id: '3', name: 'Bags'},
  {id: '5', name: 'Electronics'},
  {id: '6', name: 'Watches'},
  {id: '7', name: 'Jewellery'},
  {id: '8', name: 'Kitchen'},
  // Add more data items as needed
];
const sortingOptionsData = [
  {id: '11', name: 'Most Popular'},
  {id: '12', name: 'Price Low to High'},
  {id: '13', name: 'Price High to Low'},
  // Add more data items as needed
];

const TextCats = props => {
  const [selectedCategory, setSelectedCategory] = useState(
    props.selected || {
      id: -1,
      name: 'All',
    },
  );

  React.useEffect(() => {
    if (props.selected) {
      setSelectedCategory(props.selected);
    }
    return () => {};
  }, [props.selected]);

  const renderItem = ({item}) => {
    const isSelected = selectedCategory.id === item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory(item);
          if (props.onSelect) {
            props.onSelect(item);
          }
        }}
        style={[
          styles.category,
          isSelected ? styles.selectedCategory : styles.unselectedCategory,
        ]}>
        <Text
          style={[
            styles.categoryName,
            isSelected
              ? styles.selectedCategoryName
              : styles.unselectedCategoryName,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={
          props.sortBy
            ? sortingOptionsData
            : [{id: -1, name: 'All'}, ...props.data]
        }
        renderItem={renderItem}
        contentContainerStyle={{paddingStart: 20}}
        keyExtractor={(item, index) => index}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: -20,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  category: {
    marginRight: 8,
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedCategory: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  unselectedCategory: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  categoryName: {
    textAlign: 'center',
    fontFamily: 'Poppins-Light',
  },
  selectedCategoryName: {
    color: 'white',
  },
  unselectedCategoryName: {
    color: 'black',
  },
});

export default TextCats;
