import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import Text from '../Text';
import {useNavigation} from '@react-navigation/native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {mmkvStorage} from '../../Utils/Modules';
import {IMAGE_B_URL} from '../../Utils/API';
const DashboardHeader = () => {
  const navigation = useNavigation();
  const [user, setUser] = useMMKVStorage('userData', mmkvStorage, null);
  const [greeting, setGreeting] = React.useState('');
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting('Afternoon');
      } else {
        setGreeting('Evening');
      }
    });
  });
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('EditProfile', {context: 'edit'})}>
        <Image
          source={
            user?.image != '' && user?.image
              ? {
                  uri: IMAGE_B_URL + user?.image,
                }
              : require('../../assets/bottomIcons/profile_f.png')
          }
          style={styles.image}
        />
      </Pressable>
      <View
        style={{
          flex: 1,
          marginStart: 10,
          justifyContent: 'space-between',
          height: 40,
        }}>
        <Text style={styles.greet}>Good {greeting} 👋</Text>
        <Text style={styles.name}>
          {user != null && user != undefined
            ? user?.first_name + ' ' + user?.last_name
            : 'Guest '}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Notifications');
        }}>
        <Image
          resizeMode="contain"
          source={require('../../assets/icons/bell.png')}
          style={styles.notification}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('WishList');
        }}>
        <Image
          resizeMode="contain"
          source={require('../../assets/icons/heart.png')}
          style={styles.heart}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 45,
    height: 45,
    backgroundColor: '#f4f4f4',
    borderRadius: 50,
  },
  notification: {
    width: 24,
    height: 24,
    marginEnd: 15,
  },
  heart: {
    width: 24,
    height: 24,
  },
  name: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    fontSize: 18,
  },
  greet: {
    fontFamily: 'Poppins-Light',
    color: 'gray',
    fontSize: 14,
  },
});
