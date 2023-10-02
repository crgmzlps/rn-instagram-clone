import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import user from '../../assets/data/user.json';
import Button from '../../components/Button';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {ProfileNavigationProp} from '../../types/navigation';
import {Auth} from 'aws-amplify';
import {useAuthContext} from '../../contexts/AuthContext';

const ProfileHeader = () => {
  const {setUser} = useAuthContext();
  const navigation = useNavigation<ProfileNavigationProp>();

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <View style={styles.root}>
      <View style={styles.headerRow}>
        {/* Profile Image */}
        <Image source={{uri: user.image}} style={styles.avatar} />
        {/* Posts, follower, following number */}
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>98</Text>
          <Text>Posts</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>198</Text>
          <Text>Followers</Text>
        </View>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>298</Text>
          <Text>Following</Text>
        </View>
      </View>

      <Text style={styles.name}>{user.username}</Text>
      <Text>{user.bio}</Text>
      {/* Buttons */}
      <View style={{flexDirection: 'row'}}>
        <Button text="Edit profile" onPress={navigateToEditProfile} />
        <Button
          text="Another button - Logout"
          onPress={() => {
            Auth.signOut();
            setUser(null);
          }}
        />
      </View>
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
