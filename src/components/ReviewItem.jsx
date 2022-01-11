import React from 'react';
import { Pressable, StyleSheet, View, Alert } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: theme.colors.backGround,
  },
  flexcontainer: {
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
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
  },
  viewButtonContainer: {
    flex: 1,
    backgroundColor: theme.colors.blueButtonBackground,
    margin: 10,
    padding: 10,
    borderRadius: 5

  },
  deleteButtonContainer: {
    flex: 1,
    backgroundColor: theme.colors.error,
    margin: 10,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: theme.colors.blueButtonText,
    textAlign: 'center'
  },

});

// View repository and delete buttons, which are rendered
// in the "My reviews" path
const BottomButtons = ({ review }) => {
  const [deleteReview] = useDeleteReview(); 

  const onDeletePress = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          style: "cancel"
        },
        {
          text: "DELETE",
          onPress: () => deleteReview(review.node.id)
        }
      ]
    );
  };
  
  return (
    <View style={styles.buttonContainer}>
    <Pressable style={styles.viewButtonContainer} >
      <Link to={`/${review.node.repository.id}`}>
          <Text style={styles.buttonText} fontSize={"subHeading"} fontWeight={"bold"}>
            View repository
          </Text>
      </Link>
    </Pressable>
    <Pressable style={styles.deleteButtonContainer} onPress={onDeletePress} >
      <Text style={styles.buttonText} fontSize={"subHeading"} fontWeight={"bold"}>
        Delete review
      </Text>
    </Pressable>
  </View>
  );
};


const ReviewItem = ({ review }) => {
  return(
    <View style={styles.container}>
      <View style={styles.flexcontainer}>
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
      {
        review.myreview ? 
        <BottomButtons review={review} />
        :
        <></>
      }
    </View>
    );
  };

export default ReviewItem;