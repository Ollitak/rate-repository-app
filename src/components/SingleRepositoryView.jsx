import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem'; 
import useRepository from '../hooks/useRepository';

const viewStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  rowView: {
    flex: 1,
  },
});

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository } = useRepository(id);

  if(!repository) return <></>;

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

export default SingleRepositoryView;