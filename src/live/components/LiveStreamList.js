import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Text from '../../../Components/Text';
import {SvgFromXml} from 'react-native-svg';
import SVG_XML from '../svg/svg';
import {useNavigation} from '@react-navigation/native';
import {Uri} from '../../../Utils/NodeApi';
import {IMAGE_B_URL} from '../../../Utils/API';
import {formatTimeAgo} from '../../../Utils/Modules';
import {Shimmer} from '../screens/LiveTab';
import BottomSheet from './BottomSheet';
import RoundedButton from '../../../Components/Common/RoundedButton';
import Button from '../../../Components/Button';

const LiveStreamList = ({data, onRefresh, header, loading}) => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const [showMenu, setShowMenu] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };
  return (
    <>
      <FlatList
        data={loading ? [2, 3, 3, 3, 3, 3, 3] : data}
        keyExtractor={item => item._id}
        style={styles.FlatList}
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={isRefreshing} />
        }
        ListHeaderComponent={header}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <SvgFromXml xml={SVG_XML.noData} />
          </View>
        )}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate('LiveScreen', {data: item})}
            style={styles.item}>
            <>
              {loading && (
                <Shimmer
                  style={[styles.thumb, {padding: 0}]}
                  visible={loading}
                />
              )}
              {!loading && (
                <ImageBackground
                  style={styles.thumb}
                  source={Uri(item.thumbnail)}>
                  <View
                    style={{
                      flex: 1,
                      padding: 16,
                      justifyContent: 'space-between',
                    }}>
                    {item.isLive ? (
                      <Text style={styles.liveText}>Live</Text>
                    ) : (
                      <View />
                    )}
                    {item.isLive && (
                      <Text style={styles.viewerText}>
                        {item?.viewers?.length} Viewers
                      </Text>
                    )}
                  </View>
                </ImageBackground>
              )}
            </>
            <View style={styles.infoContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ChannelDetails', {data: item.user})
                }>
                {loading && <Shimmer visible={loading} style={styles.avatar} />}
                {!loading && (
                  <Image
                    style={styles.avatar}
                    source={{uri: IMAGE_B_URL + item?.user?.image}}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                {loading && (
                  <Shimmer
                    style={[styles.title, {marginBottom: 10}]}
                    visible={loading}></Shimmer>
                )}
                {!loading && (
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                )}

                <Shimmer visible={loading} style={styles.description}>
                  <Text numberOfLines={1} style={styles.description}>
                    {item?.user?.name + ' • ' + formatTimeAgo(item.createdAt)}
                  </Text>
                </Shimmer>
              </View>
              {!loading && (
                <TouchableOpacity
                  onPress={() => setShowMenu(true) && setSelectedItem(item)}
                  style={styles.backButton}>
                  <SvgFromXml height={20} width={20} xml={SVG_XML.threeDot} />
                </TouchableOpacity>
              )}
            </View>
          </Pressable>
        )}
      />
      <BottomSheet
        visible={showMenu}
        title={'Menu'}
        onClose={() => setShowMenu(false) && setSelectedItem(null)}>
        <View
          style={{
            gap: 15,
            marginBottom: 10,
            paddingTop: 10,
            paddingBottom: 15,
          }}>
          <TouchableOpacity style={styles.row}>
            <SvgFromXml xml={SVG_XML.notInterested} />
            <Text style={styles.rowText}>Not Interested</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <SvgFromXml xml={SVG_XML.report} />
            <Text style={styles.rowText}>Report</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </>
  );
};

export default LiveStreamList;

const styles = StyleSheet.create({
  thumb: {
    height: 200,
    // width: Dimensions.get('screen').width,
    width: '100%',
    // padding: 16,
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    gap: 20,
    paddingBottom: 40,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 16,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },
  item: {
    gap: 10,
    marginBottom: 5,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    lineHeight: 16,
    width: '80%',
    marginTop: 2,
  },
  liveText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    backgroundColor: 'red',
    alignSelf: 'flex-start',
    paddingVertical: 2.5,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
    fontSize: 12,
    lineHeight: 16,
  },
  FlatList: {
    marginBottom: 0,
    flexGrow: 1,
  },
  viewerText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
    lineHeight: 16,
    fontSize: 12,
    marginTop: 2,
  },
  description: {
    fontSize: 12,
    color: 'gray',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
    margin: -10,
    alignSelf: 'flex-start',
    borderRadius: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
});
