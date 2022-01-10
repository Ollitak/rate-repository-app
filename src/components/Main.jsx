import React from 'react';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignOut from './SignOut';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import theme from '../theme';
import SingleRepositoryView from './SingleRepositoryView';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signout">
          <SignOut />
        </Route>
        <Route path="/reviewform">
          <ReviewForm />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/myreviews">
          <MyReviews />
        </Route>
        <Route path="/:id">
          <SingleRepositoryView />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;