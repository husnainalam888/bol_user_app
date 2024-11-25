import React, {useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ratings = ['All', '5', '4', '3', '2', '1', '0']; // You can customize the ratings as needed

const RatingFilter = ({onSelect, selected}) => {
  const [selectedRating, setSelectedRating] = useState(
    selected.rating ?? ratings[0],
  );

  const renderItem = ({item, index}) => {
    const isSelected = selectedRating == item;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedRating(item);
          onSelect({id: index, rating: item});
          //   onSelect(item);
        }}
        style={[styles.ratingItem, isSelected && styles.selectedRatingItem]}>
        <Icon name="star" color={isSelected ? 'white' : 'black'} />
        <Text
          style={[styles.ratingText, isSelected && styles.selectedRatingText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ratings}
        renderItem={renderItem}
        contentContainerStyle={{paddingStart: 20}}
        keyExtractor={index => index}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  ratingItem: {
    flexDirection: 'row',
    marginRight: 8,
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  selectedRatingItem: {
    flexDirection: 'row',
    backgroundColor: 'black',
    borderColor: 'black',
    paddingVertical: 8,
  },
  ratingText: {
    textAlign: 'center',
    marginStart: 5,
    color: 'black',
  },
  selectedRatingText: {
    color: 'white',
    marginStart: 5,
  },
});

export default RatingFilter;
