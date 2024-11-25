import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Search from '../DashboardComps/Search';

const Header = ({
  value,
  searchStyle,
  showTitle = true,
  showSearch = true,
  title = 'Title',
  hideBack,
  onPressFilter,
  onChangeText,
  onSubmit,
  searchText,
  style,
  showFilter = true,
  showFind = false,
  onPressFind,
}) => {
  const navigation = useNavigation();
  const [searchVisible, setSearchVisible] = React.useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSearchPress = () => {
    // Your search functionality here
  };

  return (
    <View style={[style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          marginHorizontal: 10,
          marginTop: 30,
        }}>
        {!hideBack && (
          <TouchableOpacity
            onPress={!hideBack && handleGoBack}
            style={{height: 24, width: 24}}>
            <Ionicons name="arrow-back" color="black" size={24} />
          </TouchableOpacity>
        )}
        {showTitle && (
          <Text
            style={{
              flex: 1,
              lineHeight: 24,
              marginHorizontal: 10,
              fontSize: 18,
              color: 'black',
              fontFamily: 'Poppins-SemiBold',
            }}>
            {title}
          </Text>
        )}
        {showSearch && (
          <TouchableOpacity
            onPress={() => {
              setSearchVisible(!searchVisible);
              handleSearchPress();
            }}>
            <Feather name="search" color="black" size={24} />
          </TouchableOpacity>
        )}
      </View>
      {showSearch && searchVisible && (
        <Search
          style={{
            marginHorizontal: 20,
            backgroundColor: 'white',
            ...searchStyle,
          }}
          onPressFilter={onPressFilter}
          value={value ?? searchText}
          onChangeText={onChangeText}
          onSubmit={onSubmit}
          showFilter={showFilter}
          showFind={showFind}
          onPressFind={onPressFind}
        />
      )}
    </View>
  );
};

export default Header;
