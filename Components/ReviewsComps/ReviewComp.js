import React, {useState} from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const ReviewComp = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          }}
          style={styles.profileImage}
        />
        <View style={styles.nameAndRating}>
          <Text style={styles.nameText}>Darlene Robertson</Text>
        </View>
        <View style={[styles.ratingItem]}>
          <FontAwesome name="star" color="black" />
          <Text style={[styles.ratingText]}>{'5'}</Text>
        </View>
        <Feather
          style={styles.icon}
          color="black"
          name="more-horizontal"
          size={16}
        />
      </View>
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewText}>
          This is a great product. I'm very satisfied with my purchase! I will
          give 10 out 5. 💯💯💯💯💯
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleToggleLike}>
          <FontAwesome
            name={isLiked ? 'heart' : 'heart-o'}
            size={20}
            color={isLiked ? 'red' : 'black'}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
        <Text style={styles.likesText}>820</Text>
        <Text style={styles.timeText}>6 days ago</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
  },
  nameAndRating: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  ellipsisIcon: {},
  reviewContainer: {
    marginTop: 10,
  },
  reviewText: {
    lineHeight: 22,
    color: 'black',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  heartIcon: {
    marginRight: 5,
  },
  likesText: {
    marginRight: 10,
    color: 'black',
    fontSize: 12,
  },
  timeText: {
    color: 'gray',
    fontSize: 12,
    marginStart: 10,
  },
  ratingText: {
    textAlign: 'center',
    marginStart: 5,
    color: 'black',
  },
  ratingItem: {
    flexDirection: 'row',
    marginRight: 8,
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  icon: {
    height: 24,
    width: 24,
    padding: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default ReviewComp;
