import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
} from 'react-native';
import TextCats from '../DashboardComps/TextCats';
import RatingFilter from '../ReviewsComps/RetingCats';
import SliderComp from '../Slider/RangeSliderComp/Slider';
import Shadow from '../Shadow';
import DropShadow from 'react-native-drop-shadow';

const AddressModal = ({visible, onClose, children, title, onAddPress}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [thisVisible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      translateY.setValue(1000);
      Animated.spring(translateY, {
        toValue: 0,
        tension: 30,
        friction: 6,
        useNativeDriver: false,
      }).start(() => {
        setVisible(true);
      });
    }
  }, [visible]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only allow vertical gestures in the top 100 units of the child
        return (
          gestureState.dy < 1 &&
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
            toValue: 700,
            tension: 30,
            friction: 6,
            useNativeDriver: false,
          }).start(() => {});
          onClose();
        } else if (gestureState.dy < 100) {
          // Swiped up
          Animated.spring(translateY, {
            toValue: 0,
            tension: 30,
            friction: 6,
            useNativeDriver: false,
          }).start(() => {});
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
    <View style={{flex: 1}}>
      {visible && (
        <>
          <Animated.View style={styles.background}>
            <Animated.View style={styles.backgroundOverlay} />
          </Animated.View>
          <Animated.View
            style={[styles.modalContainer, {transform: [{translateY}]}]}>
            <Animated.View {...panResponder.panHandlers} style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
            </Animated.View>
            <Animated.View style={styles.content}>{children}</Animated.View>
            <Animated.View style={styles.footer}>
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={() => onAddPress()}>
                <Text style={[styles.buttonText, styles.applyButtonText]}>
                  Add
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    elevation: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  header: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  content: {
    paddingBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginBottom: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 100,
    flex: 1,
    backgroundColor: '#e2e2e2',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  applyButtonText: {
    color: 'white',
  },
  heading: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AddressModal;
