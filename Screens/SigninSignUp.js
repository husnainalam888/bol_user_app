import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import RoundedButton from '../Components/Common/RoundedButton';
import InputComp from '../Components/Common/InputComp';
import {postRequest} from '../Utils/API';
import ContainerView from '../Components/Common/ContainerView';
import {useCustomAlert} from '../Components/Common/AlertProvider';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../Utils/Modules';

const LoginSignUp = ({navigation}) => {
  const [userData, setUserData] = useMMKVStorage('userData', mmkvStorage, null);
  const showAlert = useCustomAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    console.log(userData);
    if (userData != null && userData !== undefined) {
      navigation.replace('BottomTabs');
    } else {
      setShowLogin(true);
    }
  }, [navigation, userData]);

  const loginApi = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      setIsLoading(true);
      const response = await postRequest('login_customer', formData);
      setIsLoading(false);
      if (response.message === 'fail') {
        showAlert('Your email or password is incorrect', 'Error Occured');
      }
      if (response.message === 'success') {
        setEmail('');
        setPassword('');
        setUserData(response.data);
        navigation.replace('BottomTabs');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showAlert('Network connection failed.', 'Error Occured');
    }
  };
  const checkValidation = () => {
    if (email === '') {
      showAlert('Please enter a valid email address.', 'Error Occured');
      return;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      showAlert('Please enter a valid email address.', 'Error Occured');
      return;
    } else if (password === '') {
      showAlert('Password is required.', 'Error Occured');
      return;
    } else if (password.length < 6) {
      showAlert(
        'Password must be at least 6 characters long.',
        'Error Occured',
      );
      return;
    }
    setValidationError('');
    loginApi();
  };
  return (
    <ContainerView isLoading={isLoading}>
      {showLogin && (
        <>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={styles.container}>
            <View style={styles.subContainer}>
              <View>
                <Image
                  resizeMode="contain"
                  style={styles.image}
                  source={require('../assets/icons/intro.png')}
                />
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={styles.heading}>Login with your account</Text>
              </View>
              <View>
                <InputComp
                  value={email}
                  placeholder={'Enter your email'}
                  startIcon={require('../assets/profileIcons/round_email.png')}
                  onChangeText={text => setEmail(text)}
                />
                <InputComp
                  value={password}
                  placeholder={'Enter your password'}
                  startIcon={require('../assets/profileIcons/lock.png')}
                  secure={true}
                  onChangeText={text => setPassword(text)}
                />
                {/* <SocialLoginButton
            iconSource={require('../assets/icons/fb.png')}
            title={'Sign in with Google'}
          />
          <SocialLoginButton
            style={{marginBottom: 0}}
            iconSource={require('../assets/icons/apple.png')}
            title={'Sign in with Apple'}
          /> */}
              </View>
              {/* <View style={styles.orDivider}>
                <View style={styles.line} />
                <Text style={{color: '#a2a2a2', marginHorizontal: 8}}>or</Text>
                <View style={styles.line} />
              </View> */}
              <RoundedButton
                onPress={() => checkValidation()}
                title={'Sign In'}
                titleStyle={{fontWeight: '600'}}
              />
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('BottomTabs')}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 16,
                }}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                  Login as guest
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditProfile', {context: 'signUp'})
                }
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginVertical: 16,
                }}>
                <Text style={{marginEnd: 8, color: 'gray'}}>
                  Don't have an account?
                </Text>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </ContainerView>
  );
};

export default LoginSignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'myfot.ttf',
    marginBottom: 32,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e1e1',
  },
  image: {
    height: Dimensions.get('window').height * 0.25,
    width: Dimensions.get('window').height * 0.25,
    alignSelf: 'center',
    marginTop: -32,
  },
});
