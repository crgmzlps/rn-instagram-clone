import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import PostUploadScreen from '../screens/PostUploadScreen';
import colors from '../theme/colors';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import {BottomTabNavigatorParamList} from './types';

const HomeButton = ({color, size}: {color: string; size: number}) => (
  <MaterialIcons name="home-filled" size={size} color={color} />
);
const SearchButton = ({color, size}: {color: string; size: number}) => (
  <MaterialIcons name="search" size={size} color={color} />
);
const UploadButton = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons
    name="plus-circle-outline"
    size={size}
    color={color}
  />
);
const NotificationsButton = ({color, size}: {color: string; size: number}) => (
  <MaterialCommunityIcons name="heart-outline" size={size} color={color} />
);
const ProfileButton = ({color, size}: {color: string; size: number}) => (
  <FontAwesome name="user-circle-o" size={size} color={color} />
);

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.black,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: HomeButton,
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: SearchButton,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={PostUploadScreen}
        options={{
          headerShown: false,
          tabBarIcon: UploadButton,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={PostUploadScreen}
        options={{
          tabBarIcon: NotificationsButton,
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ProfileButton,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
