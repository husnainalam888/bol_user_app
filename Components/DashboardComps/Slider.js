import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {IMAGE_B_URL} from '../../Utils/API';
import {offers} from '../../DemoApiResponses/DashboardApis';

const slides = [
  {
    key: '1',
    title: 'Welcome to MyApp',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: {
      uri: 'https://img.freepik.com/free-photo/big-sale-discounts-products_23-2150336701.jpg?w=900&t=st=1693333608~exp=1693334208~hmac=008b047c3a9f5ac750db4f51cbdbfc9f4035f39be9ff19aabc43492a3c80396b',
    },
  },
  {
    key: '2',
    title: 'Explore Features',
    text: 'Discover amazing features that make our app unique.',
    image: {
      uri: 'https://img.freepik.com/free-vector/hand-drawn-floral-sale-banner-with-photo_1188-325.jpg?w=996&t=st=1693333483~exp=1693334083~hmac=19d4547e807462115680b4a7c113e554e5c82e10e8c6ce6081591349525f3e86',
    },
  },
  {
    key: '3',
    title: 'Get Started',
    text: 'Start using our app and enjoy a seamless experience.',
    // image: require('./image3.jpg'),
  },
  // Add more slides as needed
];

const ImageSlider = props => {
  const [showRealApp, setShowRealApp] = useState(false);

  const renderSlide = ({item}) => (
    <View style={[styles.slide, props.renderItemStyle]}>
      <Image
        resizeMode={props.resizeMode || 'center'}
        source={
          props.data?.length > 0
            ? {uri: IMAGE_B_URL + item.image}
            : props.data?.length == 0
            ? item?.no_image
            : {uri: item.image}
        }
        style={[
          styles.image,
          props.backgroundColor && {backgroundColor: props.backgroundColor},
          props.borderWidth && {
            borderWidth: props.borderWidth,
            borderColor: '#dedede',
            borderRadius: 20,
          },
        ]}
      />
    </View>
  );

  const onDone = () => {};

  return (
    <View style={[styles.container, props.style]}>
      {showRealApp ? (
        <Text>Your App Content Goes Here</Text>
      ) : (
        <AppIntroSlider
          style={{flexGrow: 0}}
          contentContainerStyle={{flexGrow: 0}}
          renderItem={renderSlide}
          slides={slides}
          onDone={onDone}
          showDoneButton={false}
          showNextButton={false}
          data={
            props.data?.length > 0
              ? props.data
              : props.data?.length == 0
              ? [{no_image: require('../../assets/icons/no.png')}]
              : offers
          }
          dotStyle={styles.dots}
          activeDotStyle={styles.activeDot}
          dotClickEnabled
          keyExtractor={(item, index) => item.key}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    overflow: 'hidden',
    marginHorizontal: -20,
  },
  slide: {
    borderRadius: 20,
    height: 200,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f3f3',
  },
  dots: {
    width: 5, // Adjust the width as needed
    height: 5, // Adjust the height as needed
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginTop: 50,
  },
  activeDot: {
    width: 15,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'black',
    marginTop: 50,
  },
});

export default ImageSlider;
