import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgFromUri, SvgFromXml} from 'react-native-svg';
import SVG_XML from '../svg/svg';
import {IMAGE_B_URL} from '../../../Utils/API';
import Button from '../../../Components/Button';
import LiveStreamList from '../components/LiveStreamList';
import {NodeGetRequest} from '../../../Utils/NodeApi';
import {toggleFollow} from '../../api/nodeApiController';
import {mmkvStorage} from '../../../Utils/Modules';

const ChannelDetails = ({navigation, route}) => {
  const setRouteUser = route?.params?.setUser;
  const [user, setUser] = useState(route.params.data);
  const [streams, setStreams] = React.useState([]);
  useEffect(() => {
    getStreams();
  }, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const getStreams = async () => {
    try {
      setIsLoading(true);
      const response = await NodeGetRequest(
        'streaming/list?userId=' + user._id,
      );
      setIsLoading(false);
      if (response.status) {
        setStreams(response.data);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SvgFromXml
          onPress={navigation.goBack}
          height={20}
          width={20}
          xml={SVG_XML.backButtonBlack}
        />
        <Text style={[styles.name, {marginTop: 2}]}>Channel Details</Text>
        {/* <SvgFromXml height={20} width={20} xml={SVG_XML.threeDotRound} /> */}
      </View>

      <View style={{marginHorizontal: -16}}>
        <LiveStreamList
          loading={isLoading}
          header={() => (
            <View style={{paddingHorizontal: 16}}>
              <ImageBackground
                style={styles.bg_image}
                blurRadius={5}
                source={{
                  uri: IMAGE_B_URL + user?.image,
                }}
              />
              <View style={styles.infoContainer}>
                <View style={{gap: 10}}>
                  <Image
                    style={styles.avatar}
                    source={{
                      uri: IMAGE_B_URL + user?.image,
                    }}
                  />
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.email}>{user?.email || ''}</Text>
                    <Text style={styles.info}>
                      <Text style={styles.followerCount}>
                        {user?.followers?.length || ''}
                      </Text>
                      {user?.followers?.length > 1
                        ? '  Followers'
                        : '  Follower'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    toggleFollow(user._id, setIsLoading, data => {
                      setUser(data);
                      console.log('setRouteUser : ', setRouteUser, data);
                      if (setRouteUser) setRouteUser(data);
                    });
                  }}
                  style={styles.Button}>
                  <Text style={styles.ButtonText}>
                    {user?.followers?.includes(
                      mmkvStorage.getMap('userData')?.mongo_id,
                    )
                      ? 'Unfollow'
                      : 'Follow'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.ButtonOutline}>
                  <Text style={styles.ButtonTextOutline}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          data={streams}
          onRefresh={getStreams}
        />
      </View>
      {/* <Loading visible={isLoading} setVisible={setIsLoading} /> */}
    </View>
  );
};
export const Loading = ({visible, setVisible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    </Modal>
  );
};
export default ChannelDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  bg_image: {
    height: 120,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: -75,
    alignSelf: 'center',
    backgroundColor: 'lightgray',
    borderWidth: 3,
    borderColor: 'white',
  },
  infoContainer: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    alignSelf: 'center',
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginTop: 2,
  },
  info: {
    fontSize: 12,
    color: 'black',
  },
  followerCount: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginTop: 2,
  },
  email: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Poppins-Regular',
  },
  ButtonContainer: {
    flexDirection: 'row',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    marginTop: -10,
  },
  Button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'black',
  },
  ButtonOutline: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  ButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 17,
    marginTop: 2,
  },
  ButtonTextOutline: {
    color: 'black',
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 17,
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000078',
  },
});
