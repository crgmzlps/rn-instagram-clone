import React from 'react';
import {StyleSheet, View} from 'react-native';
import user from '../../assets/data/user.json';
import FeedGridView from '../../components/FeedGridView';
import ProfileHeader from './ProfileHeader';
import {useNavigation, useRoute} from '@react-navigation/native';

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId} = route.params;
  // query the user with userId
  navigation.setOptions({title: user.username});
  return <FeedGridView data={user.posts} listHeaderComponent={ProfileHeader} />;
};

const styles = StyleSheet.create({});

export default ProfileScreen;
