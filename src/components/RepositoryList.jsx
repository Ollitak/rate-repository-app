import RepositoryItem from './RepositoryItem';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useHistory } from 'react-router-native';


import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({ repositories, history }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    // helper component to render clickable items
    const renderItem = ({ item }) => {
      const onPress = () => {
        history.push(`/${item.id}`);
      };

      return (
        <TouchableOpacity onPress={onPress}>
          <RepositoryItem item={item} />
        </TouchableOpacity>
      );
    };


  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
    />
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const history = useHistory();

  return (
    <RepositoryListContainer repositories={repositories} history={history}/>
  );
};

export default RepositoryList;