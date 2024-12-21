import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import Video from 'react-native-video';
import Text from '../Components/Text';
import VideoPlayer from 'react-native-video-controls';
import {IMAGE_B_URL} from '../Utils/API';
import {FlatList} from 'react-native';
import {SvgFromXml} from 'react-native-svg';
import SVG_XML from '../src/live/svg/svg';
import SocketService from '../socket/SocketService';
import {formatTimeAgo, mmkvStorage} from '../Utils/Modules';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {NodeGetRequest} from '../Utils/NodeApi';
import {toggleFollow} from '../src/api/nodeApiController';
import {Loading} from '../src/live/screens/ChannelDetails';

const LiveScreen = ({navigation, route}) => {
  const data = route.params?.data;
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const [viwers, setViwers] = useState(data.viewers);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(data.comments);
  const commentsRef = useRef(null);
  const [streamUser, setStreamUser] = useState(data.user);
  const [isLoading, setIsLoading] = useState(false);
  const [chatToggle, setChatToggle] = useState(false);
  useEffect(() => {
    // console.log('LiveScreen data : ', JSON.stringify(data, null, 2));
    commentsRef.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    SocketService.joinStream(data.streamKey);
    SocketService.onViewerJoined(data => {
      console.log('onViewerJoined : ', data);
      setViwers(prevViwers => {
        const already = prevViwers.find(
          x => x._id == data._id || x == data._id,
        );
        if (!already && data._id) {
          console.log('onViewerJoined : !already ', already);
          return [...prevViwers, data];
        }
        return prevViwers;
      });
    });
    SocketService.onViewerLeft(data => {
      setViwers(viwers.filter(x => x._id !== data._id && x != data._id));
    });
    SocketService.onComment(data => {
      console.log('onComment : ', data);
      setComments(comments => {
        if (comments.find(x => x._id === data._id)) {
          const index = comments.findIndex(x => x._id == data._id);
          comments[index] = data;
          return comments;
        } else {
          return [data, ...comments];
        }
      });
      commentsRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    });
    SocketService.onStreamEnded(data => {
      Alert.alert('Streaming Stoped', 'The stream has been stopped.');
      setIsPlaying(false);
    });
    getComments();
    return () => {
      SocketService.leaveStream(
        data.streamKey,
        mmkvStorage.getMap('userData').mongo_id,
      );
    };
  }, []);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setChatToggle(true);
    });
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
    };
  }, []);
  const getComments = async () => {
    try {
      const response = await NodeGetRequest(`streaming/comments/${data._id}`);
      if (response.status) {
        console.log(
          'getComments : respone :',
          JSON.stringify(response.data, null, 2),
        );
        setComments(response.data);
      }
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  const handleSendComment = () => {
    console.log('commentText : ', commentText);
    if (commentText) {
      SocketService.sendComment({
        commentText: commentText,
        streamId: data.streamKey,
        userId: user.mongo_id,
      });
      setCommentText('');
    }
  };
  return (
    <View style={styles.container}>
      {/* <VideoPlayer source={{uri: data.stream_link}} /> */}
      <View
        style={[
          styles.videoContainer,
          isFullScreen && {height: Dimensions.get('window').height},
        ]}>
        <Video
          style={[
            styles.liveStreamView,
            isFullScreen && {height: Dimensions.get('window').height},
          ]}
          paused={!isPlaying}
          muted={false}
          repeat={true}
          source={{
            uri: data.stream_link,
          }}
          onLoad={event => {
            console.log('onLoad :', event);
            setIsPlaying(true);
          }}
          onError={error => {
            console.log(error);
            if (isPlaying) {
              setIsPlaying(false);
            }
          }}
          onProgress={progress => {
            console.log(progress);
          }}
          onEnd={() => setIsPlaying(false)}
        />
        <View style={styles.overlay}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <SvgFromXml height={16} width={16} xml={SVG_XML.backButton} />
          </TouchableOpacity>
          <View style={styles.pauseButtonContaner}>
            <SvgFromXml
              height={40}
              onPress={() => setIsPlaying(!isPlaying)}
              width={40}
              xml={!isPlaying ? SVG_XML.play : SVG_XML.pause}
            />
          </View>
          <View style={styles.bottomControls}>
            <View style={styles.rowJustify}>
              <View style={styles.row}>
                <SvgFromXml height={16} width={16} xml={SVG_XML.live} />
                <Text style={styles.smWhite}>
                  {data.isLive ? 'Live' : 'Offline'}
                </Text>
              </View>
              <View style={styles.row}>
                <SvgFromXml height={16} width={22} xml={SVG_XML.viwers} />
                <Text style={{...styles.smWhite, ...{marginLeft: -5}}}>
                  {viwers?.length}
                </Text>
              </View>
            </View>
            <SvgFromXml
              onPress={() => setFullScreen(!isFullScreen)}
              height={16}
              width={16}
              xml={isFullScreen ? SVG_XML.fullScreenOff : SVG_XML.fullScreen}
            />
          </View>
        </View>
      </View>
      <View style={styles.subContainer}>
        {!chatToggle && (
          <>
            <View
              style={{
                gap: 5,
                borderBottomWidth: 1,
                borderBottomColor: '#f3f3f3',
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.description}>{data.description}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChannelDetails', {
                  data: streamUser,
                  setUser: setStreamUser,
                });
              }}
              activeOpacity={1}
              style={styles.channel}>
              <Image
                style={styles.image}
                source={{uri: IMAGE_B_URL + data?.user?.image}}
              />
              <View style={{flex: 1}}>
                <Text style={styles.title}>{data?.user?.name}</Text>
                <Text style={styles.description}>{data?.user?.email}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  toggleFollow(streamUser._id, setIsLoading, setStreamUser);
                }}
                style={styles.followBtn}>
                <Text style={styles.followBtnText}>
                  {streamUser?.followers?.includes(user.mongo_id)
                    ? 'Unfollow'
                    : 'Follow'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </>
        )}
        <View
          style={[
            styles.commentHeader,
            chatToggle && {marginTop: 10, marginBottom: -10},
          ]}>
          <Text style={styles.commentHeaderTitle}>Live Chat</Text>
          <TouchableOpacity
            onPress={() => setChatToggle(!chatToggle)}
            style={[
              styles.chatToggle,
              chatToggle && {transform: [{rotate: '270deg'}]},
            ]}>
            <SvgFromXml xml={SVG_XML.backButtonBlack} height={16} width={16} />
          </TouchableOpacity>
        </View>
        <CommentList data={comments} ref={commentsRef} />
        <View style={styles.line} />
        <View style={styles.commentInputContainer}>
          <TextInput
            placeholderTextColor={'#999999'}
            style={styles.commentInput}
            value={commentText}
            onChangeText={text => setCommentText(text)}
            placeholder="Add a comment"
          />
          <TouchableOpacity
            onPress={() => handleSendComment()}
            style={styles.commentButton}>
            <SvgFromXml height={16} width={16} xml={SVG_XML.send} />
          </TouchableOpacity>
        </View>
      </View>
      <Loading visible={isLoading} />
    </View>
  );
};

export const CommentList = forwardRef(({data = []}, ref) => {
  return (
    <FlatList
      data={data}
      ref={ref}
      inverted={true}
      style={styles.commentList}
      contentContainerStyle={{gap: 8, paddingVertical: 10}}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <View style={styles.commentItem}>
          <Image
            style={styles.commentImage}
            source={{uri: IMAGE_B_URL + item?.userId?.image}}
          />
          <View style={{flex: 1}}>
            <View style={styles.nameContainer}>
              <Text style={styles.commentName}>{item.userId?.name}</Text>
              <Text style={styles.commentTime}>
                {formatTimeAgo(item.createdAt)}
              </Text>
            </View>
            <Text style={styles.commentText}>{item.comment}</Text>
          </View>
        </View>
      )}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  liveStreamView: {
    height: 250,
    // width: Dimensions.get('window').width,
    width: '100%',
    backgroundColor: 'black',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
  },
  streamingButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: '#f3f3f3',
  },
  streamingButtonActive: {
    backgroundColor: 'red',
  },
  subContainer: {
    flex: 1,
    gap: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 12,
    color: 'black',
  },
  channel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  followBtn: {
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  followBtnText: {
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 2,
  },
  commentItem: {
    flexDirection: 'row',
    gap: 10,
  },
  commentList: {
    paddingHorizontal: 20,
  },
  commentImage: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'black',
  },
  commentName: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    lineHeight: 22,
  },
  commentText: {
    fontSize: 12,
    color: 'black',
    lineHeight: 14,
  },
  commentTime: {
    fontSize: 10,
    color: 'black',
    lineHeight: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    marginTop: 10,
    marginVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
    backgroundColor: '#f3f3f3',
    borderRadius: 50,
  },
  commentInput: {
    flex: 1,
    color: 'black',
  },
  commentButton: {
    marginLeft: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
  pauseButtonContaner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: -5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
  },
  smWhite: {
    fontSize: 12,
    color: 'white',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    marginVertical: -10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    justifyContent: 'space-between',
  },
  commentHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  chatToggle: {
    margin: -10,
    padding: 10,
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 16,
    margin: -16,
  },
});

export default LiveScreen;
