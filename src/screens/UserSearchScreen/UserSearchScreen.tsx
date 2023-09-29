import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import users from '../../assets/data/users.json';
import UserListItem from '../../components/UserListItem';

const UserSearchScreen = () => {
  return (
    <FlatList
      data={users}
      renderItem={({item}) => <UserListItem user={item} />}
    />
  );
};

const styles = StyleSheet.create({});

export default UserSearchScreen;
