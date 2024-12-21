import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {IMAGE_B_URL} from '../../../Utils/API';
import {useNavigation} from '@react-navigation/native';
import {Shimmer} from '../screens/LiveTab';

const HChannels = ({data, loading}) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={loading ? [1, 2, 2, 2, 2] : data}
      style={styles.FlatList}
      horizontal={true}
      keyExtractor={item => item._id}
      contentContainerStyle={{gap: 16}}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ChannelDetails', {data: item})}
          style={styles.item}>
          <Shimmer style={styles.image} visible={loading}>
            <Image
              style={[
                styles.image,
                item.isLive && {borderWidth: 1, borderColor: 'red'},
              ]}
              source={{uri: IMAGE_B_URL + item.image}}
            />
            {item.isLive && <View style={styles.isLive} />}
          </Shimmer>
        </TouchableOpacity>
      )}
    />
  );
};

export default HChannels;

const styles = StyleSheet.create({
  item: {
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
  },
  isLive: {
    backgroundColor: 'red',
    borderRadius: 10,
    height: 16,
    width: 16,
    alignSelf: 'flex-end',
    marginTop: -16,
    marginRight: 10,
    marginBottom: 10,
  },
  FlatList: {
    flexGrow: 0,
    marginVertical: 10,
  },
});
