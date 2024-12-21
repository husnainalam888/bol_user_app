import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../Utils/Colors';
import DropDownModal from '../ProfileComps/DropDownModal';
import {TabBarItem} from 'react-native-tab-view';
import {SvgFromXml} from 'react-native-svg';

const InputComp = props => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showPass, setShowPass] = useState(props.secure ? true : false);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (props.onPress) props.onPress();
        if (props.options) setShowOptions(true);
      }}
      style={[styles.container, props.style]}>
      {props.startIcon && (
        <Image
          resizeMode={'center'}
          source={props.startIcon}
          style={[
            styles.endIcon,
            {marginStart: 10, marginEnd: -5},
            props.startIconStyle,
          ]}
        />
      )}
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor || '#999999'}
        value={props.value}
        editable={
          props.editable != null || props.editable != undefined
            ? props.editable
            : props.options
            ? false
            : true
        }
        style={[styles.input, props.inputStyle]}
        onChangeText={props.onChangeText}
        secureTextEntry={showPass}
      />
      {(props.endIcon || props.secure) && (
        <TouchableOpacity
          onPress={() => {
            if (props.onPress) props.onPress();
            if (props.options) setShowOptions(true);
            if (props.secure) setShowPass(!showPass);
          }}>
          <Image
            resizeMode={'contain'}
            source={
              props.secure && showPass
                ? require('../../assets/icons/hidePass.png')
                : props.secure && !showPass
                ? require('../../assets/icons/showPass.png')
                : props.endIcon
            }
            style={[styles.endIcon, props.endIconStyle]}
          />
        </TouchableOpacity>
      )}
      {props.options && (
        <DropDownModal
          title={'Select'}
          visible={showOptions}
          onClose={() => setShowOptions(false)}>
          <FlatList
            keyExtractor={(item, index) => index}
            style={{
              marginTop: 20,
              maxHeight: Dimensions.get('window').height * 0.8,
            }}
            data={props.options}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.container,
                  props.value == item && {backgroundColor: '#000000'},
                ]}
                onPress={() => {
                  props.onOptionSelected(item);
                  setShowOptions(false);
                }}>
                <Text
                  style={[
                    styles.input,
                    {
                      padding: 15,
                      color: props.value == item ? 'white' : 'black',
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </DropDownModal>
      )}
      {props.endSvg && (
        <SvgFromXml style={{marginHorizontal: 16}} xml={props.endSvg} />
      )}
    </TouchableOpacity>
  );
};

export default InputComp;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  input: {
    color: 'black',
    fontSize: 14,
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 12,
  },
  endIcon: {
    height: 20,
    width: 20,
    marginEnd: 10,
  },
});
