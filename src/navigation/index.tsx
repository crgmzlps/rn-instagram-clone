import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

import logo from '../assets/images/logo.png';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen
          name="UserProfile"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        />
        <Stack.Screen
          name="Feed"
          component={HomeScreen}
          options={{headerTitle: CustomHeaderTitle, headerTitleAlign: 'center'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const CustomHeaderTitle = () => (
  <Image source={logo} style={{width: 150, height: 40}} resizeMode="contain" />
);

export default Navigation;
