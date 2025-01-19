import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Text from '../../../Components/Text';
import {SvgFromXml} from 'react-native-svg';
import SVG_XML from '../svg/svg';
import LiveStreamList from '../components/LiveStreamList';
import {NodeGetRequest, NodePostRequest} from '../../../Utils/NodeApi';
import HChannels from '../components/HChannels';
import {mmkvStorage} from '../../../Utils/Modules';
import {useFocusEffect} from '@react-navigation/native';
import LoadingShimmer from '../components/LoadingShimmer';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
const TAG = 'LiveTab.js';
const LiveTab = ({navigation}) => {
  const [streamsList, setStreamsList] = useState([]);
  const [followedChannels, setFollowedChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      fetchAll();
    }, []),
  );

  const fetchAll = async () => {
    setIsLoading(true);
    await getStreamsList();
    await getFollowedChannels();
    setIsLoading(false);
    setFirstLoad(false);
  };
  const getStreamsList = async () => {
    try {
      const response = await NodeGetRequest('streaming/list');
      console.log(TAG, 'getStreamsList : response :', response?.data[0]);
      if (response.status) {
        setStreamsList(response.data);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
    }
  };
  const getFollowedChannels = async () => {
    try {
      const response = await NodePostRequest(
        'streaming/followed_channels',
        {
          userId: mmkvStorage.getMap('userData').mongo_id,
        },
        true,
      );
      console.log(TAG, 'getFollowedChannels : response :', response?.data[0]);
      if (response.status) {
        setFollowedChannels(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title="Live"
        onPressSearch={() =>
          navigation.navigate('SearchLive', {
            context: 'all',
            streams: streamsList,
          })
        }
      />
      <LiveStreamList
        loading={firstLoad}
        header={() => (
          <View style={{paddingHorizontal: 16}}>
            {followedChannels.length > 0 && (
              <View>
                <Label
                  visible={firstLoad}
                  title="Followed Channels"
                  onPress={() => {
                    navigation.navigate('SearchLive', {
                      context: 'followers',
                      channels: followedChannels,
                    });
                  }}
                />
                <HChannels loading={firstLoad} data={followedChannels} />
              </View>
            )}
            <Label
              title="Recommended For You"
              visible={firstLoad}
              onPress={() => {
                navigation.navigate('SearchLive', {
                  context: 'streams',
                  streams: streamsList,
                });
              }}
            />
          </View>
        )}
        onRefresh={() => {
          setFirstLoad(true);
          fetchAll();
        }}
        data={streamsList}
      />
    </View>
  );
};

const Header = ({onPressSearch}) => (
  <View style={styles.headerContainer}>
    <View style={styles.startIcon}>
      <SvgFromXml height={16} width={16} xml={SVG_XML.live} />
    </View>
    <Text style={styles.title}>Live Streams</Text>
    <TouchableOpacity onPress={onPressSearch} style={styles.searchIcon}>
      <SvgFromXml height={16} width={16} xml={SVG_XML.search} />
    </TouchableOpacity>
  </View>
);
export const Label = ({title, onPress, visible}) => (
  <Shimmer visible={visible}>
    <View style={styles.labelContainer}>
      <Text style={styles.labelTExt}>{title}</Text>
      <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <SvgFromXml height={16} width={16} xml={SVG_XML.right} />
      </TouchableOpacity>
    </View>
  </Shimmer>
);

export const Shimmer = ({children, visible, style = {}}) => {
  return (
    <ShimmerPlaceholder
      style={
        visible
          ? [{width: '100%', marginBottom: 2, borderRadius: 10}, style]
          : {}
      }
      visible={!visible}
      shimmerColors={['#f3f3f3', '#f9f9f9', '#f3f3f3']}
      location={[0, 0, 0]}
      LinearGradient={LinearGradient}>
      {children}
    </ShimmerPlaceholder>
  );
};

export default LiveTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    gap: 16,
    paddingBottom: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    flex: 1,
    marginTop: 2,
  },
  startIcon: {
    padding: 8,
    overflow: 'hidden',
    backgroundColor: 'black',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'black',
  },
  searchIcon: {
    padding: 10,
    overflow: 'hidden',
    backgroundColor: '#f3f3f3',
    borderRadius: 100,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelTExt: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 24,
    color: 'black',
    marginTop: 2,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 16,
    margin: -16,
  },
});
