import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const LoadingShimmer = ({children, visible = true, style}) => {
  return (
    <ShimmerPlaceHolder
      visible={visible}
      LinearGradient={LinearGradient}
      style={style}
    />
  );
};

export default LoadingShimmer;
