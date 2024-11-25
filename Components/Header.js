import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6'; // Change to FontAwesome5
import {Colors} from '../Utils/Colors';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, onIconPress1, onIconPress2, middleText}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, middleText && {paddingVertical: 8}]}>
      {middleText && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.icon, {marginLeft: 0}]}>
          <Icon name="chevron-left" size={16} color={Colors.white} />
        </TouchableOpacity>
      )}
      <Text
        style={[
          styles.title,
          middleText && {textAlign: 'center', marginRight: 50},
        ]}>
        {title}
      </Text>
      <View style={styles.iconContainer}>
        {!middleText && (
          <>
            <TouchableOpacity onPress1={onIconPress1} style={styles.icon}>
              <Icon name="bell" size={16} color={'#ffffff'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onIconPress2} style={styles.icon}>
              <Icon name="user" size={16} color={'#ffffff'} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.primary1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default Header;
