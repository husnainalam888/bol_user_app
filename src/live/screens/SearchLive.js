import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../Components/Common/Header';
import {SvgFromXml} from 'react-native-svg';
import SVG_XML from '../svg/svg';
import VChannels from '../components/VChannels';
import LiveStreamList from '../components/LiveStreamList';
import InputComp from '../../../Components/Common/InputComp';

const SearchLive = ({navigation, route}) => {
  const context = route.params.context;
  const channels = route.params?.channels;
  const streams = route.params?.streams;
  const [searchText, setSearchText] = useState('');
  const [filteredChannels, setFilteredChannels] = useState(channels);
  const [filteredStreams, setFilteredStreams] = useState(streams);
  let title =
    context == 'streams'
      ? 'Recommended Streams'
      : context == 'followers'
      ? 'Followed Channels'
      : 'Discover ';
  const handleSearch = t => {
    setSearchText(t);
    if (context == 'streams' || context == 'all') {
      if (t.trim() != '') {
        setFilteredStreams(
          streams.filter(e => e.title.toLowerCase().includes(t.toLowerCase())),
        );
      } else {
        setFilteredStreams(streams);
      }
    } else if (context == 'followers') {
      if (t.trim() != '') {
        setFilteredChannels(
          channels.filter(e => e.name.toLowerCase().includes(t.toLowerCase())),
        );
      } else {
        setFilteredChannels(channels);
      }
    }
  };
  return (
    <View style={styles.container}>
      <LiveHeader title={title} navigation={navigation} />
      <InputComp
        placeholder={'Search'}
        value={searchText}
        onChangeText={handleSearch}
        style={styles.searchInput}
        endSvg={SVG_XML.search}
      />
      {channels?.length > 0 && <VChannels data={filteredChannels} />}
      {streams?.length > 0 && <LiveStreamList data={filteredStreams} />}
    </View>
  );
};
const LiveHeader = ({navigation, title}) => {
  return (
    <View style={styles.LiveHeader}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <SvgFromXml xml={SVG_XML.backButtonBlack} height={16} width={16} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
export default SearchLive;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  LiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    flex: 1,
    marginTop: 2,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 16,
    marginHorizontal: -16,
    marginVertical: -10,
  },
  searchInput: {
    marginHorizontal: 16,
  },
});
