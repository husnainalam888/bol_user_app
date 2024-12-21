import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import {IMAGE_B_URL} from '../../../Utils/API';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../../../Utils/Modules';
import {Shimmer} from '../screens/LiveTab';

const VChannels = ({data, loading}) => {
  const [user] = useMMKVStorage('userData', mmkvStorage, null);
  return (
    <FlatList
      keyExtractor={item => item._id}
      data={loading ? [1, 2, 4, 5] : data}
      style={styles.FlatList}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({item}) => (
        <Shimmer visible={loading}>
          <View style={styles.item}>
            <Image
              source={{uri: IMAGE_B_URL + item.image}}
              style={styles.avatar}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.description}>{`${
                item.followers?.length > 1
                  ? `${item.followers.length} Followers`
                  : `${item.followers.length} Follower`
              }`}</Text>
            </View>
            <TouchableOpacity style={styles.followBtn}>
              <Text style={styles.followText}>
                {item.followers?.includes(user.mongo_id)
                  ? 'Unfollow'
                  : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        </Shimmer>
      )}
    />
  );
};

export default VChannels;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 8,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: '#000000',
  },
  FlatList: {
    flexGrow: 0,
    marginHorizontal: 16,
  },
  contentContainerStyle: {
    gap: 16,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  description: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  followBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#686868',
    backgroundColor: 'black',
  },
  followText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'white',
    lineHeight: 18,
    marginTop: 2,
  },
});
