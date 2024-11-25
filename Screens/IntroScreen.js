import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React from 'react';
import Header from '../Components/Common/Header';
import SocialLoginButton from '../Components/SocialLoginComps/SocialLoginBtn';
import Button from '../Components/Button';
import RoundedButton from '../Components/Common/RoundedButton';

const IntroScreen = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.container}>
      <Header showTitle={false} showSearch={false} />
      <View style={styles.subContainer}>
        <View>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={require('../assets/icons/intro.png')}
          />
          <Text style={styles.heading}>Let's you in</Text>
        </View>
        <View>
          <SocialLoginButton
            iconSource={require('../assets/icons/google.png')}
            title={'Sign in with facebook'}
          />
          <SocialLoginButton
            iconSource={require('../assets/icons/fb.png')}
            title={'Sign in with Google'}
          />
          <SocialLoginButton
            style={{marginBottom: 0}}
            iconSource={require('../assets/icons/apple.png')}
            title={'Sign in with Apple'}
          />
        </View>
        <View style={styles.orDivider}>
          <View style={styles.line} />
          <Text style={{color: '#a2a2a2', marginHorizontal: 8}}>or</Text>
          <View style={styles.line} />
        </View>
        <RoundedButton
          onPress={() => navigation.navigate('LoginSignUp')}
          title={'Sign in with password'}
          titleStyle={{fontWeight: '600'}}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{marginEnd: 8}}>Don't have an account?</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            Sign Up
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get('window').height * 0.25,
    width: Dimensions.get('window').height * 0.25,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-around',
    marginHorizontal: 20,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'myfot.ttf',
    marginTop: 16,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e1e1e1',
  },
});
