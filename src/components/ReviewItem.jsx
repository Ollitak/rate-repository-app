import React from 'react';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: theme.colors.backGround,
    display: "flex",
    flexDirection: "row",
  },
  ratingContainer: {
    flex: 0,
    height: 50,
    width: 50,
    borderRadius: 50,
    borderWidth: 3,
    marginRight: 10,
    borderColor: theme.colors.blueButtonBackground,
    justifyContent: "center"
  },
  ratingText: {
    textAlign: "center",
    color: theme.colors.blueButtonBackground,
  },
  textContainer: {
    flex: 1,
  }
});


const ReviewItem = ({ review }) => {
  return(
    <View style={styles.container}>
      <View style={styles.ratingContainer}>  
        <Text style={styles.ratingText}>
          {review.node.rating}
        </Text>
      </View>


      <View style={styles.textContainer}>
        { 
          review.myreview ? 
          <Text fontSize={"subHeading"} fontWeight={"bold"}> {review.node.repository.fullName} </Text>
          :
          <Text fontSize={"subHeading"} fontWeight={"bold"}> {review.node.user.username} </Text>
        }
        <Text fontSize={"subHeading"}> {review.node.createdAt.split("T")[0]} </Text>
        <Text fonstSize={"subHeading"}> {review.node.text} </Text>   
      </View>
    </View>
  );
};

export default ReviewItem;