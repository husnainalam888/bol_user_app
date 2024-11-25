import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SvgFromXml} from 'react-native-svg';
import SVG_XML from '../svg/svg';
import {useNavigation} from '@react-navigation/native';
import {Uri} from '../../../Utils/NodeApi';

const LiveStreamList = ({data}) => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.title}
      style={styles.FlatList}
      contentContainerStyle={styles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <Pressable
          onPress={() => navigation.navigate('LiveScreen')}
          style={styles.item}>
          <View>
            <ImageBackground style={styles.thumb} source={Uri(item.thumbnail)}>
              {item.isLive ? (
                <Text style={styles.liveText}>Live</Text>
              ) : (
                <View />
              )}
              <Text style={styles.viewerText}>
                {item.viewers.length} viewers
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.infoContainer}>
            <Image
              style={styles.avatar}
              source={{uri: 'https://picsum.photos/200'}}
            />
            <View style={styles.titleContainer}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {item.description}
              </Text>
            </View>
            <SvgFromXml height={20} width={20} xml={SVG_XML.threeDot} />
          </View>
        </Pressable>
      )}
    />
  );
};

export default LiveStreamList;

const styles = StyleSheet.create({
  thumb: {
    height: 200,
    width: Dimensions.get('screen').width - 32,
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    gap: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  item: {
    gap: 10,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  liveText: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    paddingVertical: 2.5,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
  },
  FlatList: {
    marginVertical: 10,
  },
  viewerText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignSelf: 'flex-start',
    paddingVertical: 2.5,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    numberOfLines: 1,
  },
});
