import React, {createContext, useContext, useState} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';

const CustomAlertContext = createContext();

export const AlertProvider = ({children}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [heading, setHeading] = useState('Error Ocurred');
  const [imageSource, setImageSource] = useState(null);
  const [onOk, setOnOk] = useState(null);

  const showCustomAlert = (
    alertMessage,
    thisHeading,
    alertImageSource,
    onOkCallback,
  ) => {
    setMessage(alertMessage);
    setImageSource(alertImageSource);
    if (thisHeading) setHeading(thisHeading);
    setOnOk(() => {
      if (onOkCallback) {
        onOkCallback();
        setVisible(false);
      }
    });
    setVisible(true);
  };

  const hideCustomAlert = () => {
    setVisible(false);
    if (onOk) {
      onOk();
    }
  };

  return (
    <CustomAlertContext.Provider value={showCustomAlert}>
      {children}
      <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.modal}>
          <View style={styles.alert}>
            <Image
              source={imageSource || require('../../assets/icons/error.png')}
              style={styles.alertImage}
              resizeMode="contain"
              defaultSource={require('../../assets/icons/error.png')}
            />
            <Text style={styles.heading}>{heading}</Text>
            <Text style={styles.message}>{message}</Text>
            <TouchableOpacity style={{width: '80%'}} onPress={hideCustomAlert}>
              <Text style={styles.okButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </CustomAlertContext.Provider>
  );
};

export const useCustomAlert = () => {
  const showCustomAlert = useContext(CustomAlertContext);
  return showCustomAlert;
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alert: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  alertImage: {
    width: 200,
    height: 110,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
    maxWidth: 200,
  },
  okButton: {
    fontSize: 16,
    color: 'white',
    padding: 10,
    backgroundColor: 'black',
    width: 200,
    textAlign: 'center',
    borderRadius: 50,
  },
});
