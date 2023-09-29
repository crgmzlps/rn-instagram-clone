import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import user from '../../assets/data/user.json';
import FeedGridView from '../../components/FeedGridView';
import {
  MyProfileNavigationProp,
  MyProfileRouteProp,
  UserProfileNavigationProp,
  UserProfileRouteProp
} from '../../navigation/types';
import ProfileHeader from './ProfileHeader';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();
  const userId = route.params?.userId;
  // query the user with userId

  // navigation.setOptions({title: user.username});
  return <FeedGridView data={user.posts} listHeaderComponent={ProfileHeader} />;
};

export default ProfileScreen;
