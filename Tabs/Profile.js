import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Common/Header';
import ProfileMenuItem from '../Components/ProfileComps/profileMenuItem';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';
import {IMAGE_B_URL} from '../Utils/API';
import LogoutModal from '../Components/ProfileComps/logoutModal';

const editIcon = require('../assets/icons/edit_white.png');

const Profile = ({navigation}) => {
  const [userData, setUserData] = useMMKVStorage('userData', mmkvStorage, {});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const profileImage =
    userData.image != ''
      ? {uri: IMAGE_B_URL + userData.image}
      : require('../assets/icons/account.png');
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'Profile'}
        showSearch={false}
        hideBack={true}
        style={{marginTop: -16}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.container, {marginHorizontal: 20}]}>
        <View style={{alignSelf: 'center'}}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Image style={styles.profileImage} source={profileImage} />
            {/* <Image style={styles.editIcon} source={editIcon} /> */}
          </View>
          <Text style={styles.name}>
            {userData.first_name + ' ' + userData.last_name}
          </Text>
          <Text style={styles.phone}>+{userData?.phone}</Text>
        </View>
        <View style={styles.line} />
        <ProfileMenuItem
          onPress={() => navigation.navigate('EditProfile', {context: 'edit'})}
          title={'Edit Profile'}
          startIcon={require('../assets/profileIcons/user.png')}
        />
        <ProfileMenuItem
          title={'Address'}
          onPress={() =>
            navigation.navigate('ShippingAddress', {title: 'Address'})
          }
          startIcon={require('../assets/profileIcons/location.png')}
        />
        <ProfileMenuItem
          title={'Notification'}
          startIcon={require('../assets/profileIcons/bell.png')}
        />
        <ProfileMenuItem
          title={'Payment'}
          startIcon={require('../assets/profileIcons/wallet.png')}
        />
        <ProfileMenuItem
          title={'Password Manager'}
          onPress={() =>
            navigation.navigate('ChangePassword', {title: 'Password Manager'})
          }
          startIcon={require('../assets/profileIcons/secure.png')}
        />
        <ProfileMenuItem
          title={'Language'}
          startIcon={require('../assets/profileIcons/globe.png')}
        />
        <ProfileMenuItem
          title={'Privacy Policy'}
          startIcon={require('../assets/profileIcons/lock.png')}
        />
        <ProfileMenuItem
          title={'Help Center'}
          startIcon={require('../assets/profileIcons/help.png')}
        />
        <ProfileMenuItem
          title={'Logout'}
          onPress={() => {
            setShowLogoutModal(true);
          }}
          startIcon={require('../assets/profileIcons/logout.png')}
        />
        <LogoutModal
          onLogoutPress={() => {
            navigation.replace('LoginSignUp');
            setUserData(null);
            mmkvStorage.clearStore();
          }}
          visible={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#f3f3f3',
  },
  editIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    bottom: 0,
    right: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  phone: {
    color: 'black',
    fontSize: 14,
    marginBottoom: 10,
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#e9e9e9',
    marginVertical: 20,
  },
});
