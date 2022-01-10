import RepositoryItem from './RepositoryItem';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';
import TextInput from './TextInput';
import { useDebounce } from 'use-debounce';


import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    height: 50,
  },
  textInput:
  {
    marginTop: 5,
    backgroundColor: "white",
  }
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
    <HeaderComponent
        setFilter={props.setFilter}
        filter={props.filter}
        setSortOrder={props.setSortOrder}
        sortOrder={props.sortOrder}>
    </HeaderComponent>
    );
  };

  render(){
    const props = this.props;
  
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map(edge => edge.node)
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
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const HeaderComponent = ({ setFilter, filter, setSortOrder, sortOrder }) => {
  return (
    <View>
      <FilterComponent setFilter={setFilter} filter={filter}></FilterComponent>
      <PickerComponent setSortOrder={setSortOrder} sortOrder={sortOrder} />
    </View>
  );
};

const FilterComponent = ({ setFilter, filter}) => {
  return (
    <View style={{padding: 10}}>
      <TextInput 
        size={"large"}
        background={"white"} 
        placeholder={"Search repositories"}
        onChangeText={setFilter}
        value={filter}
        />
    </View>
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
  const history = useHistory();
  const [sortOrder, setSortOrder] = useState('LATEST');
  const [filter, setFilter] = useState('ze');
  const [filterDecounced] = useDebounce(filter, 500);

  const { repositories } = useRepositories(sortOrder, filterDecounced);

  return (
    <RepositoryListContainer repositories={repositories} history={history} setSortOrder={setSortOrder} sortOrder={sortOrder} filter={filter} setFilter={setFilter}/>
  );
};

export default RepositoryList;