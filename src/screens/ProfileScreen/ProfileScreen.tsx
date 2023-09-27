import React from 'react';
import {StyleSheet, View} from 'react-native';
import user from '../../assets/data/user.json';
import FeedGridView from '../../components/FeedGridView';
import ProfileHeader from './ProfileHeader';

const ProfileScreen = () => {
  return (
    <View>
      <FeedGridView data={user.posts} listHeaderComponent={ProfileHeader} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProfileScreen;
