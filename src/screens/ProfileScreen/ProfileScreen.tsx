import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import FeedGridView from '../../components/FeedGridView';
import {
  MyProfileNavigationProp,
  MyProfileRouteProp,
  UserProfileNavigationProp,
  UserProfileRouteProp,
} from '../../types/navigation';
import ProfileHeader from './ProfileHeader';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import {GetUserQuery, GetUserQueryVariables} from '../../API';
import {ActivityIndicator} from 'react-native';
import ApiErrorMessage from '../../components/ApiErrorMessage';
import {useAuthContext} from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const navigation = useNavigation<
    UserProfileNavigationProp | MyProfileNavigationProp
  >();
  const {userId: authUserId} = useAuthContext();
  const userId = route.params?.userId;

  const {data, error, loading, refetch} = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(getUser, {variables: {id: userId || authUserId}});
  const user = data?.getUser;

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !user) {
    return (
      <ApiErrorMessage
        title="Error fetching the user"
        message={error?.message || 'User not found'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <FeedGridView
      data={user.Posts?.items || []}
      listHeaderComponent={() => <ProfileHeader user={user} />}
      refetch={refetch}
      loading={loading}
    />
  );
};

export default ProfileScreen;
