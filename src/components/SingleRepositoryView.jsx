import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem'; 
import useRepository from '../hooks/useRepository';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const RepositoryInfo = ({ repository }) => {
  // add idField to recognize that RepositoryItem
  // is called from RepositoryItem component
  const updatedRepository = { ...repository, idField: true };

  // for now unknown reason, rendering the RepositoryItem component
  // messes up the UI (see the commented JSX below). For this reason,
  // FlatList is implemented like in RepositoryList component 
  const listForm = [updatedRepository];

  return(
    <FlatList
      data={listForm}
      renderItem={RepositoryItem}
    />
    );
    
    // This messes up the UI...
    /*
    <View>
      <RepositoryItem item={repository} />
    </View>
    */
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id);

  if(!repository) return <></>;

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();

  };

  return (
    <View>
      <FlatList 
        data={repository.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.node.id}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={() =><RepositoryInfo repository={repository} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        />
    </View>
    );

};

export default SingleRepositoryView;