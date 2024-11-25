import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can use any other icon library you prefer
import {Colors} from '../Utils/Colors';
import DropShadow from 'react-native-drop-shadow';
import Shadow from './Shadow';

const UploadButton = ({name, value, ...props}) => {
  const tickIconName = value ? 'checkmark-circle' : 'checkmark-circle-outline';

  return (
    <Shadow>
      <Text style={styles.label}>{props.label}</Text>

      <TouchableOpacity style={styles.container}>
        <Icon name={name} size={20} color={Colors.hint} style={styles.icon} />
        <Text style={styles.title}>{props.title}</Text>
        <Icon
          name={tickIconName}
          size={20}
          color={value ? Colors.primary1 : Colors.hint}
        />
      </TouchableOpacity>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    color: Colors.hint,
    fontSize: 16,
    flex: 1,
    color: Colors.hint,
    lineHeight: 30,
    marginHorizontal: 10,
  },
  label: {
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default UploadButton;
