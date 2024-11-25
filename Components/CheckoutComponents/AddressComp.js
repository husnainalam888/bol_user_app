import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../../Utils/Modules';
const Notification = ({
  type,
  title,
  message,
  onPress,
  isSelected,
  mode,
  withPrice,
  startIcon,
  price,
  item,
}) => {
  const [selectedAddress, setSelectedAddres] = useMMKVStorage(
    'selectedAddress',
    mmkvStorage,
    {},
  );
  const [endIconSource, setEndIconSource] = React.useState(
    mode == 'selection' && item.id == selectedAddress.id
      ? require('../../assets/icons/selected.png')
      : mode == 'selection' && item.address.id != selectedAddress.id
      ? require('../../assets/icons/unSelect.png')
      : require('../../assets/icons/edit_black.png'),
  );
  const imageSource = startIcon || require('../../assets/icons/location.png');
  console.log(item);
  React.useEffect(() => {
    setEndIconSource(
      mode == 'selection' && item.id == selectedAddress.id
        ? require('../../assets/icons/selected.png')
        : mode == 'selection' && item.address.id != selectedAddress.id
        ? require('../../assets/icons/unSelect.png')
        : require('../../assets/icons/edit_black.png'),
    );
  }, [selectedAddress]);
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (mode == 'selection') {
          setSelectedAddres(item);
          return;
        }
        onPress();
      }}
      style={styles.container}>
      <View style={[styles.imageContainer, {backgroundColor: '#f3f3f3'}]}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="center"
            source={imageSource}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item?.city}</Text>
        <Text style={styles.message}>{message || `${item?.address}`}</Text>
      </View>
      {withPrice && (
        <Text style={[styles.title, {marginHorizontal: 10}]}>
          {price || '$10'}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          if (mode == 'selection') {
            setSelectedAddres(item);
            return;
          }
          onPress();
        }}>
        <Image
          source={endIconSource}
          style={[styles.image, {height: 20, width: 20}]}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  message: {
    fontSize: 14,
    marginTop: 5,
    color: 'gray',
  },
});

export default Notification;
