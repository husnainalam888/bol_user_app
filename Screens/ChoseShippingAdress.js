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
import {isLoaded, useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';
import {useCustomAlert} from '../Components/Common/AlertProvider';
import MyContainer from '../Components/Common/MyContainer';
import {getRequest} from '../Utils/API';

const ChoseShippingAddress = ({route, navigation}) => {
  const showAlert = useCustomAlert();
  const title = route.params?.title || 'Shipping Address';
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const [selectedItem, setSelected] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddress] = useMMKVStorage('address', mmkvStorage, []);
  const [mode, setMode] = useState(title !== 'Address' ? 'selection' : 'edit');
  const [selectedAddress, setSelectedAddress] = useMMKVStorage(
    'selectedAddress',
    mmkvStorage,
    null,
  );

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      fetchAddress();
      setMode(title !== 'Address' ? 'selection' : 'edit');
    });
    return () => {};
  }, []);

  const fetchAddress = async () => {
    try {
      setIsLoading(true);
      const response = await getRequest('get_address/' + user.id);
      setIsLoading(false);
      setAddress(response.data);
    } catch (e) {
      console.log('Eror:', e);
      setIsLoading(false);
    }
  };

  const onPressAddNewAddress = () => {
    navigation.navigate('AddNewAddress');
  };
  const onPressApply = () => {
    if (selectedAddress == null) {
      if (addresses.length > 0) {
        showAlert('Please select a shipping address first ', 'Error Occured');
      } else {
        showAlert('Please add a shiiping address first ', 'Error Occured');
      }
    } else navigation.goBack();
  };
  return (
    <MyContainer isLoading={isLoading} style={{backgroundColor: '#ea000000'}}>
      <SafeAreaView style={styles.container}>
        <Header
          title={title || 'Shipping Address'}
          showSearch={false}
          style={{marginTop: -16, paddingBottom: 8}}
        />
        <ScrollView style={styles.subContainer}>
          <FlatList
            style={styles.flatList}
            keyExtractor={item => item.id}
            data={addresses}
            renderItem={({item}) => (
              <AddressComp
                mode={mode}
                item={item}
                isSelected={item === selectedItem}
                onPress={() => setSelected(item)}
              />
            )}
          />
          {title === 'Shipping Address' && (
            <RoundedButton
              onPress={() => navigation.navigate('AddNewAddress')}
              titleStyle={styles.buttonTitle}
              style={styles.addButton}
              title="Add New Address"
            />
          )}
        </ScrollView>
        <DropShadow style={styles.dropShadow}>
          <View style={styles.buttonContainer}>
            <RoundedButton
              style={[
                styles.applyButton,
                selectedAddress == null &&
                  mode == 'selection' && {backgroundColor: 'gray'},
              ]}
              onPress={
                title === 'Address' ? onPressAddNewAddress : onPressApply
              }
              title={title === 'Shipping Address' ? 'Apply' : 'Add New Address'}
            />
          </View>
        </DropShadow>
      </SafeAreaView>
    </MyContainer>
  );
};

export default ChoseShippingAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  flatList: {
    flexGrow: 0,
  },
  buttonTitle: {
    color: 'black',
  },
  addButton: {
    backgroundColor: '#e5e5e5',
    marginBottom: 20,
  },
  dropShadow: {
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
  },
  applyButton: {
    margin: 20,
  },
});
