import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../Components/Common/Header';
import InputComp from '../Components/Common/InputComp';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {log, mmkvStorage} from '../Utils/Modules';
import {countries, tempUser} from '../DemoApiResponses/User';
import RoundedButton from '../Components/Common/RoundedButton';
import {pickSingle} from 'react-native-document-picker';
import {useCustomAlert} from '../Components/Common/AlertProvider';
import ContainerView from '../Components/Common/ContainerView';
import {IMAGE_B_URL, postRequest} from '../Utils/API';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfile = ({navigation, route}) => {
  const context = route.params.context;
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const [profileImg, setProfileImg] = useState('');
  // const [country, setCountry] = useState(user?.country ?? 'Country');
  const [gender, setGender] = useState(user?.gender ?? 'Gender');
  const [firstName, setFirstName] = useState(user?.first_name ?? '');
  const [middleName, setMiddleName] = useState(user?.middle_name ?? '');
  const [lastName, setLastName] = useState(user?.last_name ?? '');
  const [postalCode, setPostalCode] = useState(user?.postal_code ?? '');
  const [houseNo, setHouseNo] = useState(user?.house_no ?? '');
  const [streetNo, setStreetNo] = useState(user?.street_no ?? '');
  const [place, setPlace] = useState(user?.place ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [dob, setDob] = useState(user?.dob ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');
  const showAlert = useCustomAlert();
  const [date, setDate] = useState(
    user?.dob ? createDateFromDateString(user?.dob) : new Date(),
  );
  const [showPicker, setShowPicker] = useState(false);

  const selectImage = async () => {
    const picked = await pickSingle({type: 'image/*'});
    setProfileImg(picked);
  };

  const checkValidation = () => {
    if (
      (context != 'edit' && profileImg == '') ||
      gender == 'Gender' ||
      firstName == '' ||
      middleName == '' ||
      lastName == '' ||
      postalCode == '' ||
      houseNo == '' ||
      streetNo == '' ||
      place == '' ||
      phone == '' ||
      dob == '' ||
      (email == '' && context != 'edit') ||
      (password == '' && context != 'edit')
    ) {
      showAlert('Please fill in all fields.', 'Error Occured');
      return;
    }
    if (
      email.includes('@') == false ||
      (email.includes('.') == false && context != 'edit')
    ) {
      showAlert('Please enter a valid email address.', 'Error Occured');
      return;
    }
    if ((phone.length < 10 || phone.length.length > 11) && context != 'edit') {
      showAlert('Please enter a valid phone number.', 'Error Occured');
      return;
    }
    if (password.length < 6 && context != 'edit') {
      showAlert(
        'Password must be at least 6 characters long.',
        'Error Occured',
      );
      return;
    }
    if (context == 'edit') editProfile();
    else registerApi();
  };

  const registerApi = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('middle_name', middleName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('gender', gender);
      // formData.append('country', country);
      formData.append('postal_code', postalCode);
      formData.append('house_no', houseNo);
      formData.append('street_no', streetNo);
      formData.append('place', place);
      formData.append('phone', phone);
      formData.append('dob', dob);
      formData.append('image', profileImg);
      setIsLoading(true);
      const response = await postRequest('register_customer', formData);
      setIsLoading(false);
      if (response.message == 'success') {
        showAlert(
          'Successfully registered! Login with your account to continue',
          'Success',
          require('../assets/icons/tick_f.png'),
        );
        log.info('Register Customer Api response : ', response);
        navigation.goBack();
      }
      if (response.message == 'already') {
        showAlert(
          'There is already an account linked with this email or phone',
          'Email or Phone already exists',
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

  const editProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('middle_name', middleName);
      formData.append('last_name', lastName);
      formData.append('gender', gender);
      // formData.append('country', country);
      formData.append('postal_code', postalCode);
      formData.append('house_no', houseNo);
      formData.append('street_no', streetNo);
      formData.append('place', place);
      formData.append('phone', phone);
      formData.append('dob', dob);
      if (profileImg?.uri != null) formData.append('image', profileImg);
      setIsLoading(true);
      const response = await postRequest(
        `update_customer_profile/${user.id}`,
        formData,
      );
      setIsLoading(false);
      if (response.message == 'success') {
        showAlert(
          'Successfully Updated!',
          'Success',
          require('../assets/icons/tick_f.png'),
        );
        setUser(response.data);
        navigation.navigate('BottomTabs');
      }
      if (response.message == 'already') {
        showAlert(
          'There is already an account linked with this email or phone',
          'Email or Phone already exists',
        );
      }
      console.log('Register Customer Api response : ', response);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      showAlert('Something went wrong. Please try again later.');
    }
  };
  console.log('user:', user);

  const showDatePicker = () => {
    setShowPicker(true);
  };
  function createDateFromDateString(dateString) {
    // Split the string into day, month, and year components
    var dateComponents = dateString.split('-');

    // Parse the components as integers
    var day = parseInt(dateComponents[0], 10);
    var month = parseInt(dateComponents[1], 10);
    var year = parseInt(dateComponents[2], 10);

    // Create a Date object using the components
    var dateObject = new Date(year, month - 1, day);

    return dateObject;
  }
  return (
    <ContainerView isLoading={isLoading}>
      <SafeAreaView style={styles.container}>
        <Header
          title={context == 'signUp' ? 'Fill your info' : 'EditProfile'}
          showSearch={false}
          style={{marginTop: -16}}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            style={styles.subContainer}>
            <TouchableOpacity
              onPress={selectImage}
              style={styles.imageContainer}>
              <View style={styles.editIcon}>
                <Image
                  style={styles.image}
                  tintColor={'white'}
                  source={require('../assets/icons/edit_black.png')}
                />
              </View>
              <Image
                style={styles.image}
                source={
                  context == 'edit' &&
                  user?.image != '' &&
                  profileImg.uri == null
                    ? {uri: IMAGE_B_URL + user.image}
                    : profileImg.uri != null
                    ? {uri: profileImg.uri}
                    : require('../assets/icons/account.png')
                }
              />
            </TouchableOpacity>
            <InputComp
              value={firstName}
              placeholder={'First Name'}
              onChangeText={text => setFirstName(text)}
            />
            <InputComp
              value={middleName}
              placeholder={'Middle Name'}
              onChangeText={text => setMiddleName(text)}
            />
            <InputComp
              value={lastName}
              placeholder={'Last Name'}
              onChangeText={text => setLastName(text)}
            />
            <InputComp
              value={postalCode}
              placeholder={'Postal Code'}
              onChangeText={text => setPostalCode(text)}
            />
            <InputComp
              value={houseNo}
              placeholder={'House No.'}
              onChangeText={text => setHouseNo(text)}
            />
            <InputComp
              value={streetNo}
              placeholder={'Street No.'}
              onChangeText={text => setStreetNo(text)}
            />
            <InputComp
              value={place}
              placeholder={'Place'}
              onChangeText={text => setPlace(text)}
            />
            <InputComp
              editable={context == 'edit' ? false : true}
              value={phone}
              placeholder={'Phone'}
              onChangeText={text => setPhone(text)}
            />
            {/* <Pressable onPress={showDatePicker}> */}
            <InputComp
              onPress={showDatePicker}
              value={dob}
              editable={false}
              placeholder={'Date of Birth'}
              onChangeText={text => setDob(text)}
              endIcon={require('../assets/profileIcons/calendar.png')}
            />
            {/* </Pressable> */}
            <InputComp
              placeholder={'Email'}
              value={email}
              editable={context == 'edit' ? false : true}
              endIcon={require('../assets/profileIcons/round_email.png')}
              onChangeText={text => setEmail(text)}
            />
            {/* <InputComp
              value={country}
              options={countries}
              onOptionSelected={item => setCountry(item)}
              endIcon={require('../assets/profileIcons/arrow_down.png')}
            /> */}
            <InputComp
              placeholder={'Gender'}
              options={['Male', 'Female']}
              value={gender}
              onOptionSelected={item => setGender(item)}
              endIcon={require('../assets/profileIcons/arrow_down.png')}
            />
            {context != 'edit' && (
              <InputComp
                placeholder={'Password'}
                value={password}
                onChangeText={text => setPassword(text)}
                secure={true}
              />
            )}
          </ScrollView>
          {Keyboard.isVisible && (
            <RoundedButton
              onPress={checkValidation}
              style={{margin: 20}}
              title={context == 'signUp' ? 'Sign Up' : 'Update'}
            />
          )}
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate;
                setShowPicker(false);
                setDob(
                  `${currentDate.getDate().toString()}-${
                    currentDate.getMonth() + 1
                  }-${currentDate.getFullYear()} `,
                );
                setDate(currentDate);
              }}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </ContainerView>
  );
};

export default EditProfile;

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
