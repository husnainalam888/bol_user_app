import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import Header from '../Components/Common/Header';
import ImageSlider from '../Components/DashboardComps/Slider';
import {SCREEN_HEIGHT} from './ProductOverview';
import {offers} from '../DemoApiResponses/DashboardApis';

const SpecialOffers = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Special Offers" />
      <View style={styles.subContainer}>
        <FlatList
          keyExtractor={(item, index) => index}
          style={{marginTop: 10}}
          showsVerticalScrollIndicator={false}
          data={[...offers]}
          renderItem={({index}) => {
            return (
              <ImageSlider
                data={[offers[index], offers[0], offers[2]]}
                style={{marginBottom: 20, height: SCREEN_HEIGHT * 0.2}}
                renderItemStyle={{height: SCREEN_HEIGHT * 0.2}}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SpecialOffers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  subContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
});
