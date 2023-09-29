import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

export type RootNavigator = {
  Home: undefined;
  Comments: {postId: string};
};

export type BottomTabNavigatorParamList = {
  HomeStack: undefined;
  Search: undefined;
  Upload: undefined;
  Notifications: undefined;
  ProfileStack: undefined;
};

export type MyProfileNavigationProp = BottomTabNavigationProp<
  BottomTabNavigatorParamList,
  'ProfileStack'
>;

export type MyProfileRouteProp = RouteProp<
  BottomTabNavigatorParamList,
  'ProfileStack'
>;

export type HomeStackNavigatorParamList = {
  Feed: undefined;
  UserProfile: {userId: string};
};

export type UserProfileNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'UserProfile'
>;

export type UserProfileRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'UserProfile'
>;

export type FeedNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Feed'
>;

export type ProfileStackNavigatorParamsList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type ProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamsList,
  'Profile'
>;
