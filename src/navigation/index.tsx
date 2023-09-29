import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {Image, Text, View} from 'react-native';

import logo from '../assets/images/logo.png';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Feed"
        /* screenOptions={{headerShown: true}} */
      >
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

        {/* <Stack.Group
          screenOptions={{headerStyle: {backgroundColor: 'lightgrey'}}}>
          <Stack.Screen name="Feed" component={HomeScreen} />
          <Stack.Screen
            name="UserProfile"
            component={ProfileScreen}
            options={{title: 'Profile'}}
          />
        </Stack.Group> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const CustomHeaderTitle = () => (
  <Image source={logo} style={{width: 150, height: 40}} resizeMode="contain" />
);

export default Navigation;
