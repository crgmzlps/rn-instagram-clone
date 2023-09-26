import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import posts from '../../assets/data/posts.json';
import FeedPost from '../../components/FeedPost';
import {IPost} from '../../types/models';

const HomeScreen = () => {
  /**
   * use FlatList instead arr.map
   * FlatList have ScrollView feature
   */
  return (
    <FlatList
      data={posts}
      renderItem={({item}) => <FeedPost post={item as IPost} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
