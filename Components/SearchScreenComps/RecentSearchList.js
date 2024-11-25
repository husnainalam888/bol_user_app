import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import FontAwesome from 'react-native-vector-icons/AntDesign';
import {mmkvStorage, openDialer} from '../../Utils/Modules';

const RecentSearchList = ({recentSearches, onPress}) => {
  const [savedSearches, setSavedSearches] = useMMKVStorage(
    'recentSearches',
    mmkvStorage,
    [],
  );

  const handleRemove = item => {
    setSavedSearches(prev => prev.filter(i => i.id !== item.id));
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => onPress(item)}
      activeOpacity={1}
      style={styles.recentItem}>
      <Text style={styles.recentKeyword}>{item.text}</Text>
      <TouchableOpacity onPress={() => handleRemove(item)}>
        <FontAwesome
          name="closecircleo"
          size={16}
          color="gray"
          onPress={() => handleRemove(item)}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      keyboardShouldPersistTaps={'handled'}
      data={recentSearches}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  recentKeyword: {
    fontSize: 16,
    color: 'gray',
  },
  closeIcon: {
    marginLeft: 10,
  },
});

export default RecentSearchList;
