import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // You can use any other icon library you prefer
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../Utils/Colors';
import Shadow from './Shadow';

const TextField = ({
  type,
  placeholder,
  value,
  endIcon,
  editable,
  onChangeText,
  ...props
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(type === 'password');

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(prevState => !prevState);
  };

  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <Shadow>
        <View style={styles.container}>
          {type === 'password' ? (
            <MIcon
              name={'lock-outline'}
              size={22}
              regular
              color={Colors.hint}
              style={styles.icon}
              onPress={toggleSecureTextEntry}
            />
          ) : type == 'username' ? (
            <Icon
              name={endIcon || 'user'}
              size={20}
              color={!editable ? '#000' : Colors.hint}
              style={styles.icon}
            />
          ) : type == 'email' ? (
            <Ionicons
              name={'mail-outline'}
              size={20}
              color={!editable ? '#000' : Colors.hint}
              style={styles.icon}
            />
          ) : (
            <MIcon
              name={endIcon}
              size={22}
              regular
              color={!editable ? '#000' : Colors.hint}
              style={styles.icon}
            />
          )}
          <View style={styles.line} />

          {!editable ? (
            <Text
              style={[
                styles.input,
                {borderRadius: 10, paddingVertical: 15, color: '#000'},
              ]}>
              {value}
            </Text>
          ) : (
            <TextInput
              style={[styles.input, {borderRadius: 10}]}
              secureTextEntry={secureTextEntry}
              placeholderTextColor={!editable ? '#000' : Colors.hint}
              editable={!editable ? editable : true}
              placeholder={
                placeholder
                  ? placeholder
                  : type == 'password'
                  ? 'Enter your password'
                  : 'Enter your username'
              }
              value={value}
              onChangeText={onChangeText}
            />
          )}
          {type == 'password' && (
            <MIcon
              name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color={Colors.hint}
              style={styles.icon}
              onPress={toggleSecureTextEntry}
            />
          )}
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
  },
  line: {
    height: '50%',
    width: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 1,
  },
});

export default TextField;
