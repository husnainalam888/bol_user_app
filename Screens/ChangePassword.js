import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Common/Header';
import InputComp from '../Components/Common/InputComp';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';
import {countries, tempUser} from '../DemoApiResponses/User';
import RoundedButton from '../Components/Common/RoundedButton';
import {pickSingle} from 'react-native-document-picker';
import {useCustomAlert} from '../Components/Common/AlertProvider';
import ContainerView from '../Components/Common/ContainerView';
import {IMAGE_B_URL, postRequest} from '../Utils/API';

const ChangePassword = ({navigation, route}) => {
  const showAlert = useCustomAlert();
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkValidation = () => {
    if (oldPassword == '' || newPassword == '' || confirmPassword == '') {
      showAlert('Please fill in all fields.', 'Error Occured');
      return;
    }
    if (newPassword != confirmPassword) {
      showAlert('Passwords do not match.', 'Error Occured');
      return;
    }
    if (newPassword.length < 6) {
      showAlert(
        'Password must be at least 6 characters long.',
        'Error Occured',
      );
      return;
    }
    changePasswordApi();
  };

  const changePasswordApi = async () => {
    try {
      const formData = new FormData();
      formData.append('old_password', oldPassword);
      formData.append('password', newPassword);
      setIsLoading(true);
      const response = await postRequest(
        `change_customer_password/${user.id}`,
        formData,
      );
      setIsLoading(false);
      if (response.message == 'success') {
        showAlert(
          'Successfully Updated!',
          'Success',
          require('../assets/icons/tick_f.png'),
        );
        navigation.navigate('BottomTabs');
      }
      if (response.message == 'already') {
        showAlert(
          'There is already an account linked with this email',
          'Email already exists',
        );
      }
      console.log('Register Customer Api response : ', response);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      showAlert(
        'Something went wrong. Please try again later.',
        'Error Occured',
      );
    }
  };
  console.log('user:', user);

  return (
    <ContainerView isLoading={isLoading}>
      <SafeAreaView style={styles.container}>
        <Header title={'Password Manager'} showSearch={false} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            style={styles.subContainer}>
            <InputComp
              value={oldPassword}
              startIcon={require('../assets/profileIcons/lock.png')}
              secure={true}
              placeholder={'Your Current Password'}
              onChangeText={text => setOldPassword(text)}
            />
            <InputComp
              value={newPassword}
              startIcon={require('../assets/profileIcons/lock.png')}
              secure={true}
              placeholder={'Your New Password'}
              onChangeText={text => setNewPassword(text)}
            />
            <InputComp
              value={confirmPassword}
              startIcon={require('../assets/profileIcons/lock.png')}
              secure={true}
              placeholder={'Confirm New Password'}
              onChangeText={text => setConfirmPassword(text)}
            />
          </ScrollView>
          <RoundedButton
            onPress={checkValidation}
            style={{margin: 20}}
            title={'Change Password'}
          />
        </ScrollView>
      </SafeAreaView>
    </ContainerView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  imageContainer: {
    height: 140,
    width: 140,
    borderRadius: 80,
    backgroundColor: '#efefef',
    alignSelf: 'center',
    marginBottom: 16,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 80,
  },
  editIcon: {
    position: 'absolute',
    height: 24,
    width: 24,
    bottom: 0,
    right: 16,
    zIndex: 1,
    backgroundColor: 'black',
    borderRadius: 40,
    padding: 2,
  },
});
