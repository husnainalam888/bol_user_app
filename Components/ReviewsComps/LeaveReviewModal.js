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
  TextInput,
} from 'react-native';
import TextCats from '../DashboardComps/TextCats';
import RatingFilter from './RetingCats';
import SliderComp from '../Slider/RangeSliderComp/Slider';
import Shadow from '../Shadow';
import DropShadow from 'react-native-drop-shadow';
import CartItem from '../CartScreenComps/CartItem';
import StarRating from 'react-native-star-rating-widget';
import {postRequest} from '../../Utils/API';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../../Utils/Modules';
const LeaveReviewModal = ({visible, onClose, item}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const [thisVisible, setVisible] = useState(false);
  const [rating, setRating] = useState(3);
  const [userData, setUserData] = useMMKVStorage('userData', mmkvStorage, {});
  const [review, setReview] = useState('');

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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('rating', rating);
      formData.append('review', review);
      formData.append('product_id', parseInt(item.product.id));
      const response = await postRequest(`add_review/${userData.id}`, formData);
    } catch (error) {
      console.error('error :', error);
    }
  };

  return (
    <Modal transparent={true} visible={visible}>
      {visible && (
        <>
          <Animated.View style={styles.background}>
            <Animated.View style={styles.backgroundOverlay} />
          </Animated.View>
          <Animated.View
            style={[styles.modalContainer, {transform: [{translateY}]}]}>
            <Animated.View {...panResponder.panHandlers} style={styles.header}>
              <Text style={styles.headerText}> {'Leave Review'} </Text>
            </Animated.View>
            <Animated.View style={styles.content}>
              <CartItem item={item} context={'track'} />
            </Animated.View>
            <Text style={[styles.heading, {textAlign: 'center'}]}>
              How is your oder
            </Text>
            <Text
              style={[
                styles.heading,
                {
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: '400',
                  marginVertical: 10,
                  color: 'gray',
                },
              ]}>
              Please give your rating also your review...
            </Text>
            <StarRating
              color={'#000000'}
              style={{alignSelf: 'center', marginVertical: 10}}
              rating={rating}
              onChange={setRating}
              enableHalfStar={false}
            />
            <TextInput
              value={review}
              onChangeText={setReview}
              placeholderTextColor={'black'}
              placeholder="Please provide your feedback"
              style={styles.input}
            />
            <Animated.View style={styles.footer}>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={() => {
                  handleSubmit();
                  onClose();
                }}>
                <Text style={[styles.buttonText, styles.applyButtonText]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#0000001e',
    borderWidth: 1,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000045',
  },
  modalContainer: {
    backgroundColor: '#f3f3f3',
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },

  content: {
    // paddingBottom: 20,
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
    marginStart: 20,
  },
  applyButtonText: {
    color: 'white',
  },
  heading: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginTop: 10,
    marginBottom: 20,
    color: 'black',
  },
});

export default LeaveReviewModal;
