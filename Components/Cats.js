import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BASE_URL, IMAGE_B_URL} from '../Utils/API';

const data = [
  {id: '1', name: 'Clothes', iconName: require('../assets/icons/shirt.png')},
  {id: '2', name: 'Shoes', iconName: require('../assets/icons/shoe.png')},
  {id: '3', name: 'Bags', iconName: require('../assets/icons/cart.png')},
  {id: '4', name: 'Electronics', iconName: require('../assets/icons/pc.png')},
  {id: '33', name: 'Watches', iconName: require('../assets/icons/watch.png')},
  {
    id: '23',
    name: 'Jewellery',
    iconName: require('../assets/icons/diamond.png'),
  },
  {id: '44', name: 'Kitchen', iconName: require('../assets/icons/soup.png')},
  {id: '46', name: 'Toys', iconName: require('../assets/icons/toys.png')},
  // Add more data items as needed
];

const Cats = ({data, onSelect}) => {
  console.log('Cats :', data);
  const getIconFromName = value => {
    const name = value?.toLowerCase();
    if (name.includes('shirt') || name.includes('clothings'))
      return require('../assets/icons/shirt.png');
    if (name.includes('shoe')) return require('../assets/icons/shoe.png');
    if (name.includes('cart')) return require('../assets/icons/cart.png');
    if (name.includes('pc') || name.includes('computer'))
      return require('../assets/icons/pc.png');
    if (name.includes('watch')) return require('../assets/icons/watch.png');
    if (name.includes('diamond')) return require('../assets/icons/diamond.png');
    if (name.includes('soup')) return require('../assets/icons/soup.png');
    if (name.includes('toys') || name.includes('games'))
      return require('../assets/icons/toys.png');
    if (name.includes('electronic') || name.includes('games'))
      return require('../assets/icons/electronics.png');
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.category}
      onPress={() => {
        onSelect(item);
      }}>
      <View style={styles.iconContainer}>
        <Image
          resizeMode="cover"
          style={[styles.icon, item.image && {height: 60, width: 60}]}
          source={
            item.image
              ? {uri: IMAGE_B_URL + item.image}
              : getIconFromName(item.name)
          }
        />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={{flexGrow: 0}}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          flexGrow: 1,
        }}
        renderItem={renderItem}
        keyExtractor={index => index}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  category: {
    alignItems: 'center',
    flex: 1 / 4,
    margin: 8,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
    color: 'black',
    maxWidth: 120,
    textAlign: 'center',
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default Cats;
