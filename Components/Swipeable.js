import React, {useRef} from 'react';
import {View, Animated, PanResponder} from 'react-native';

const Swipeable = ({children, onSwipeUp, onSwipeDown}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only allow vertical gestures in the top 100 units of the child
        return (
          gestureState.dy < 100 &&
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx)
        );
      },
      onPanResponderMove: (_, gestureState) => {
        // Update translateY with the vertical movement
        translateY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          // Swiped down
          Animated.spring(translateY, {
            toValue: 0,
            tension: 30,
            friction: 6,
            useNativeDriver: false,
          }).start(() => {
            // onSwipeDown();
          });
        } else if (gestureState.dy < -100) {
          // Swiped up
          Animated.spring(translateY, {
            toValue: 0,
            tension: 30,
            friction: 6,
            useNativeDriver: false,
          }).start(() => {
            // onSwipeUp();
          });
        } else {
          // Return to the initial position
          Animated.spring(translateY, {
            toValue: 0,
            tension: 30,
            friction: 6,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View style={{flex: 1, transform: [{translateY}]}}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          height: 100,
          backgroundColor: 'red',
        }}></Animated.View>
      {children}
    </Animated.View>
  );
};

export default Swipeable;
