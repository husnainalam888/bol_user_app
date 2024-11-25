import React from 'react';
import {View, Text} from 'react-native';
import Dialog from 'react-native-dialog';

const LocationEnableAlert = ({isVisible, onCancel, onEnable}) => {
  return (
    <Dialog.Container visible={isVisible}>
      <Dialog.Title>Enable Location Services</Dialog.Title>
      <Dialog.Description>
        To use this feature, please enable location services.
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={onCancel} />
      <Dialog.Button label="Enable" onPress={onEnable} />
    </Dialog.Container>
  );
};

export default LocationEnableAlert;
