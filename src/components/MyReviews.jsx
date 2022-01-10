import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const MyReviews = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER, {
    variables: { includeReviews: true }
    }
  );
  
  if(!data) return <></>;

  // add a myreviews field in order to distinquish whether
  // we are using ReviewItem in myreviews page
    const dataMyReviewAdded = data.authorizedUser.reviews.edges.map(review =>{
      return { ...review, myreview: true };
    });

  //console.log(data.authorizedUser.reviews.edges[0].node);
 
  const ItemSeparator = () => <View style={styles.separator} />;


  return (
    <View style={{marginTop: 4}}>
      <FlatList 
        data={dataMyReviewAdded}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.node.id}
        ItemSeparatorComponent={ItemSeparator}
        contentContainerStyle={{ paddingBottom: 100 }}
        />
    </View>
    );


};

export default MyReviews;