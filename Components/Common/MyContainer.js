import React from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
} from 'react-native';
import RoundedButton from './RoundedButton';

const MyContainer = ({
  children,
  isLoading,
  networkError,
  imageSource,
  message,
  onPressBtn,
  buttonText,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {isLoading && (
        <Modal visible={isLoading} transparent>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" />
          </View>
        </Modal>
      )}

      {networkError ? (
        <View style={styles.errorContainer}>
          <Image
            resizeMode="contain"
            source={
              imageSource
                ? imageSource
                : require('../../assets/icons/error.png')
            }
            style={styles.errorImage}
          />
          <Text
            style={[
              styles.errorMessage,
              {marginHorizontal: Dimensions.get('window').width * 0.25},
            ]}>
            {message ? message : 'Network Error Occurred Please Try Again '}
          </Text>
          <RoundedButton
            onPress={() => {
              onPressBtn();
            }}
            title={buttonText ? buttonText : 'Retry'}
            style={{paddingHorizontal: 30, marginVertical: 20}}
          />
        </View>
      ) : (
        children
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#00000078',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorImage: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    textAlign: 'center',
  },
});

export default MyContainer;
