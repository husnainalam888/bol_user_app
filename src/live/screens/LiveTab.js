import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgFromXml} from 'react-native-svg';
import SVG_XML from '../svg/svg';
import LiveStreamList from '../components/LiveStreamList';
import {NodeGetRequest} from '../../../Utils/NodeApi';
const TAG = 'LiveTab.js';
const LiveTab = () => {
  const [streamsList, setStreamsList] = useState([]);
  useEffect(() => {
    getStreamsList();
  }, []);
  const getStreamsList = async () => {
    try {
      const response = await NodeGetRequest('streaming/list');
      console.log(TAG, 'getStreamsList : response :', response);
      if (response.status) {
        setStreamsList(response.data);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Error', e.message);
    }
  };
  return (
    <View style={styles.container}>
      <Header title="Live" />
      <LiveStreamList onRefresh={getStreamsList} data={streamsList} />
    </View>
  );
};

const Header = () => (
  <View style={styles.headerContainer}>
    <SvgFromXml height={20} width={20} xml={SVG_XML.live} />
    <Text style={styles.title}>Featured Live Streams</Text>
  </View>
);

export default LiveTab;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    padding: 16,
    gap: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
