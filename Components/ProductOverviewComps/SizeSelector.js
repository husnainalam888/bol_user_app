import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';

const sizes = ['S', 'M', 'L'];

const SizesSelector = () => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const renderItem = ({item}) => {
    const isSelected = selectedSize === item;
    return (
      <TouchableOpacity
        onPress={() => setSelectedSize(item)}
        style={[
          styles.sizeItem,
          isSelected ? styles.selectedSizeItem : styles.unselectedSizeItem,
        ]}>
        <Text
          style={[
            styles.sizeText,
            isSelected ? styles.selectedSizeText : styles.unselectedSizeText,
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Size</Text>
      <FlatList
        data={sizes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1 / 2,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  sizeItem: {
    height: 40,
    width: 40,
    marginRight: 8,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSizeItem: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  unselectedSizeItem: {
    backgroundColor: 'white',
    borderColor: 'gray',
  },
  sizeText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedSizeText: {
    color: 'white',
  },
  unselectedSizeText: {
    color: 'gray',
  },
});

export default SizesSelector;
