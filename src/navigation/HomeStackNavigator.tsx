import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import logo from '../assets/images/logo.png';
import {Image} from 'react-native';
import {HomeStackNavigatorParamList} from './types';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const CustomHeaderTitle = () => (
  <Image source={logo} style={{width: 150, height: 40}} resizeMode="contain" />
);

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerTitle: CustomHeaderTitle, headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
