import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import FeedPost from './components/FeedPost';

import posts from './assets/posts.json';

function App(): JSX.Element {
  return (
    <ScrollView style={styles.app}>
      {posts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
