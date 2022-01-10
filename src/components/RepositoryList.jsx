import RepositoryItem from './RepositoryItem';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';


import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    height: 50,
  }
});

export const RepositoryListContainer = ({ repositories, history, setSortOrder, sortOrder }) => {
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
      ListHeaderComponent={() =><PickerComponent setSortOrder={setSortOrder} sortOrder={sortOrder} />}
    />
  );
};

const PickerComponent = ({ setSortOrder, sortOrder}) => {
  return (
    <View>
      <Picker
        style={styles.picker}
        selectedValue={sortOrder}
        onValueChange={(itemValue) =>
          setSortOrder(itemValue)
      }>
        <Picker.Item label="Latest repositories" value="LATEST" />
        <Picker.Item label="Highest rated repositories" value="RATING_DESC" />
        <Picker.Item label="Lowest rated repositories" value="RATING_ASC" />
      </Picker>
    </View>
);
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState('RATING_ASC');
  const { repositories } = useRepositories(sortOrder);
  const history = useHistory();

  return (
    <RepositoryListContainer repositories={repositories} history={history} setSortOrder={setSortOrder} sortOrder={sortOrder} />
  );
};

export default RepositoryList;