import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

const DiscountFlatList = ({data, onAddPress, onRemovePress, style}) => {
  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={[...data, 'end']}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <>
              {item != 'end' && (
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}> {item}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      newData = data.filter(item => item != item);
                      onRemovePress(newData);
                    }}>
                    <Text style={[[styles.tagText, {marginEnd: 10}]]}>
                      {'✕'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {item == 'end' && (
                <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              )}
            </>
          );
        }}
        horizontal={false} // This allows the tags to wrap to the next row
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tagContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 16,
    margin: 5,
    justifyContent: 'center',
  },
  tagText: {
    lineHeight: 16,
    fontSize: 14,
    color: 'white',
    alignSelf: 'center',
    marginStart: 10,
  },
  addButton: {
    backgroundColor: 'black',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default DiscountFlatList;
