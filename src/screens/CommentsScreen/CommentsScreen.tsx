import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import comments from '../../assets/data/comments.json';
import Comment from '../../components/Comment';

const CommentsScreen = () => {
  return (
    <View>
      <FlatList
        data={comments}
        style={{padding: 10}}
        renderItem={({item}) => <Comment comment={item} includeDetails={true} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CommentsScreen;
