import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../Components/Common/Header';
import RatingSelector from '../Components/ReviewsComps/RetingCats';
import ReviewComp from '../Components/ReviewsComps/ReviewComp';

const Reviews = () => {
  return (
    <View>
      <Header title="4.8 (4,742 reviews)" />
      <RatingSelector />
      <FlatList
        keyExtractor={index => index}
        contentContainerStyle={{marginTop: 20}}
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={() => <ReviewComp />}
      />
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
