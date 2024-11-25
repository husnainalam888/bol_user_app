import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const ErrorModal = ({isVisible, imageSource, errorMessage, onRetry, type}) => {
  const image =
    type === 'empty'
      ? require('../assets/noDatalarge.png')
      : require('../assets/noDatalarge.png');
  if (isVisible)
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image resizeMode="cover" source={image} style={styles.errorImage} />
          <Text style={styles.errorMessage}>
            {errorMessage || 'No order available right now'}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  else return <View></View>;
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
  },
  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 16,
    borderRadius: 30,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default ErrorModal;
