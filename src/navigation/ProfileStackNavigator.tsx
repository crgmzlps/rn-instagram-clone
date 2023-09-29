import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {ProfileStackNavigatorParamsList} from './types';

const Stack = createNativeStackNavigator<ProfileStackNavigatorParamsList>();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edit profile'}}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
