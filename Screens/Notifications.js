import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Header from '../Components/Common/Header';
import NotificationComp from '../Components/Notifications/NotificationComp';
import NotiList from '../Components/Notifications/NotiList';

const Notifications = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header endIcon="dots" title="Notifications" />
      <ScrollView>
        <NotiList />
        <NotiList date={'Yesterday'} />
        <NotiList date={'Aug 27, 2023'} />
        <NotiList date={'July 27, 2023'} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
});
