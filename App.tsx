import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './Navigations/Stack';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {LogBox} from 'react-native';
import {AlertProvider} from './Components/Common/AlertProvider';

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaView style={styles.container}>
      <AlertProvider>
        <NavigationContainer>
          <StackNavigator />
          <StatusBar backgroundColor={'#000'} />
        </NavigationContainer>
      </AlertProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    height: '80%',
    width: '100%',
  },
});
