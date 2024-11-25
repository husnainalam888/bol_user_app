import React, {useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const colors = ['#FF5733', '#E91E63', '#9C27B0', '#2196F3', '#00BCD4'];

const ColorSelector = ({data,onSelect}) => {
  const colors = data ? JSON.parse(data) : false;
  const [selectedColor, setSelectedColor] = useState(colors[0] || false);
  const renderItem = ({item}) => {
    const isSelected = selectedColor.value == item.value;
    return (
      <TouchableOpacity
        onPress={() =>{
          setSelectedColor(item)
          onSelect(item);
           }}
        style={[
          styles.colorItem,
          {backgroundColor: item.value},
          isSelected && styles.selectedColorItem,
        ]}>
        {isSelected && <AntDesign name="check" size={16} color="white" />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Colors</Text>
      <View style={styles.colorContainer}>
        <FlatList
          data={colors}
          renderItem={renderItem}
          keyExtractor={item => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingTop: 10, flex: 1 / 2},
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap items to the next row
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedColorItem: {
    borderWidth: 2,
    borderColor: 'gray',
  },
});

export default ColorSelector;
