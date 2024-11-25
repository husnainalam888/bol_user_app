import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Search = ({
  clickable,
  onPress,
  onPressFilter,
  onChangeText,
  onKeyPress,
  onSubmit,
  value,
  style,
  showFilter = true,
  showFind = false,
  onPressFind,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : onPressFilter}
      style={[styles.container, style]}>
      <Image
        style={{height: 16, width: 16}}
        source={require('../../assets/icons/search.png')}
      />
      <TextInput
        value={value}
        inputMode="email"
        onSubmitEditing={onSubmit}
        editable={!clickable}
        autoFocus={true}
        style={styles.input}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        placeholderTextColor={'lightgray'}
        placeholder="Search"
      />
      {showFilter && (
        <TouchableOpacity
          style={{
            height: 30,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={clickable ? onPress : onPressFilter}>
          <Image
            resizeMode="contain"
            style={{height: 16, width: 16}}
            source={require('../../assets/icons/filter.png')}
          />
        </TouchableOpacity>
      )}
      {showFind && (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
            borderRadius: 5,
          }}
          onPress={clickable ? onPress : onPressFind}>
          {/* <Image
            resizeMode="contain"
            style={{height: 24, width: 24}}
            source={require('../../assets/icons/findLocation.png')}
          /> */}
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 20,
              paddingVertical: 5,
              paddingHorizontal: 20,
            }}>
            Find
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    marginVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
    flex: 1,
  },
});
