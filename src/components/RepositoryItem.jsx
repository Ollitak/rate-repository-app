import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';

const cardHeaderStyles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    marginBottom: 15,
  },
  pictureView: {
    paddingRight: 15,
  },
  picture: {
    height: 50,
    width: 50,
    borderRadius: 5,
  },
  informationView: {
    flex: 1,
  },
  informationText: {
    marginBottom: 5,
  },
  languageView: {
    flexDirection: "row",
  },
  languageText: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.languageTag,
    color: theme.colors.languageText
  },
});

const CardHeader = ({ item }) => {
  return (
    <View style={cardHeaderStyles.container}>
      <View style={cardHeaderStyles.pictureView}>
        <Image style={cardHeaderStyles.picture} source={{uri: item.ownerAvatarUrl}}/>
      </View>
      <View style={cardHeaderStyles.informationView}>
        <Text fontSize={"subHeading"} fontWeight={"bold"} style={cardHeaderStyles.informationText}>{item.fullName}</Text> 
        <Text fontSize={"subHeading"} style={cardHeaderStyles.informationText}>{item.description} </Text>
        <View style={cardHeaderStyles.languageView}>
          <Text fontSize={"subHeading"} style={cardHeaderStyles.languageText}>{item.language} </Text>
        </View>
      </View>
    </View>
  );
};

const numberFormatting = (number) => {
  if(number < 1000) return number;
  const formattedNumber = `${Math.round(number/100)/10}k`;
  return formattedNumber;
};

const cardStatisticsStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  rowView: {
    flex: 1,
  },
});

const CardStatistics = ({ item }) => {
  return (
    <View style={cardStatisticsStyles.container}>
      <View style={cardStatisticsStyles.rowView}>
        <Text style={{textAlign: 'center'}} fontWeight={"bold"}>{numberFormatting(item.stargazersCount)}</Text>
        <Text style={{textAlign: 'center'}}>Stars</Text>
      </View>
      <View style={cardStatisticsStyles.rowView}>
        <Text style={{textAlign: 'center'}} fontWeight={"bold"}>{numberFormatting(item.forksCount)}</Text>
        <Text style={{textAlign: 'center'}}>Forks</Text>
      </View>
      <View style={cardStatisticsStyles.rowView}>
        <Text style={{textAlign: 'center'}} fontWeight={"bold"}>{numberFormatting(item.reviewCount)}</Text>
        <Text style={{textAlign: 'center'}}>Reviews</Text>
      </View>
      <View style={cardStatisticsStyles.rowView}>
        <Text style={{textAlign: 'center'}} fontWeight={"bold"}>{numberFormatting(item.ratingAverage)}</Text>
        <Text style={{textAlign: 'center'}}>Rating</Text>
      </View>
    </View>
  );
};


const cardStyles = StyleSheet.create({
  container: {
    marginBottom: 3,
    padding: 10,
    backgroundColor: "white"
  },
});


const RepositoryItem = ({ item }) => {  
  return (
  <View style={cardStyles.container}>
    <CardHeader item={item}></CardHeader>
    <CardStatistics item={item}></CardStatistics>
  </View>
  );
};

export default RepositoryItem;