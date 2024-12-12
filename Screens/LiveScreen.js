import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

const LiveScreen = ({navigation, route}) => {
  const data = route.params?.data;
  console.log(data);
  return (
    <View style={styles.container}>
      <VideoPlayer source={{uri: data.stream_link}} />
      {/* <Video
        style={styles.liveStreamView}
        paused={false}
        muted={true}
        render
        source={{
          uri: data.stream_link,
        }}
        onError={error => console.log(error)}
        onProgress={progress => console.log(progress)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  liveStreamView: {
    height: 300,
    width: Dimensions.get('window').width,
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
});

export default LiveScreen;
