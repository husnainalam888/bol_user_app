import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import Header from '../Components/Common/Header';
import AddressComp from '../Components/CheckoutComponents/AddressComp';
import RoundedButton from '../Components/Common/RoundedButton';
import DropShadow from 'react-native-drop-shadow';

const ChooseShippingType = () => {
  const [selectedItem, setSelected] = useState(1);
  const shippingTypes = [
    {
      title: 'Economy',
      desc: 'Estimated arrival in 4-5 days',
      price: '$10',
      startIcon: require('../assets/icons/economyShipping.png'),
    },
    {
      title: 'Regular',
      desc: 'Estimated arrival in 3-4 days',
      price: '$20',
      startIcon: require('../assets/icons/regularShipping.png'),
    },
    {
      title: 'Cargo',
      desc: 'Estimated arrival in 2-3 days',
      price: '$30',
      startIcon: require('../assets/icons/cargoShipping.png'),
    },
    {
      title: 'Express',
      desc: 'Estimated arrival in 1-2 days',
      price: '$40',
      startIcon: require('../assets/icons/expressShipping.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Shipping Address'} showSearch={false} />
      <ScrollView style={styles.subContainer}>
        <FlatList
          keyExtractor={index => index}
          keyExtractor={index => index}
          data={shippingTypes}
          renderItem={({item}) => (
            <AddressComp
              title={item.title}
              message={item.desc}
              price={item.price}
              mode={'selection'}
              startIcon={item.startIcon}
              withPrice={true}
              isSelected={item.price === selectedItem.price}
              onPress={() => setSelected(item)}
            />
          )}
        />
      </ScrollView>
      <DropShadow style={styles.dropShadow}>
        <View style={styles.dropShadowContent}>
          <RoundedButton style={styles.roundedButton} title="Apply" />
        </View>
      </DropShadow>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  dropShadow: {
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  dropShadowContent: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  roundedButton: {
    margin: 20,
  },
});

export default ChooseShippingType;
