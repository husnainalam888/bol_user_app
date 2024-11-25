import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';
const LiveScreen = () => {
  return (
    <View style={styles.container}>
      <Video
        style={styles.liveStreamView}
        paused={false}
        muted={true}
        source={{
          uri: 'http://16.171.41.45:8080/hls/testing.m3u8',
        }}
        onError={error => console.log(error)}
        onProgress={progress => console.log(progress)}
      />
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
