import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {IUser} from '../../types/models';
import fonts from '../../theme/fonts';
import colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';

interface IUserListItemProps {
  user: IUser;
}

const UserListItem = ({user}: IUserListItemProps) => {
  const navigation = useNavigation();
  const goToUserScreen = () => {
    navigation.navigate('UserProfile', {userId: user.id});
  };

  return (
    <Pressable style={styles.root} onPress={goToUserScreen}>
      <Image source={{uri: user.image}} style={styles.image} />
      <View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: fonts.weight.bold,
    marginBottom: 5,
  },
  username: {
    color: colors.grey,
  },
});

export default UserListItem;
