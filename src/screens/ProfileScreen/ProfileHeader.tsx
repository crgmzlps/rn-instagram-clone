import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigationProp} from '../../types/navigation';
import {Auth} from 'aws-amplify';
import {User} from '../../API';
import {DEFAULT_USER_IMAGE} from '../../config';
import {useAuthContext} from '../../contexts/AuthContext';

interface IProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({user}: IProfileHeaderProps) => {
  const {userId} = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile Image */}
        <Image
          source={{uri: user.image || DEFAULT_USER_IMAGE}}
          style={styles.avatar}
        />
        {/* Posts, follower, following number */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofPosts}</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowers}</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>{user.nofFollowings}</Text>
          <Text>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.username}</Text>
      <Text>{user.bio}</Text>
      {/* Buttons */}
      {userId === user.id && (
        <View style={{flexDirection: 'row'}}>
          <Button text="Edit profile" onPress={navigateToEditProfile} />
          <Button
            text="Another button - Logout"
            onPress={() => {
              Auth.signOut();
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  numberContainer: {
    alignItems: 'center',
  },
  numberText: {
    fontSize: fonts.size.md,
    fontWeight: fonts.weight.full,
    color: colors.black,
  },
  name: {
    fontWeight: fonts.weight.semi,
    color: colors.black,
  },
});

export default ProfileHeader;
