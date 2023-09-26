import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import FeedPost from './components/FeedPost';

function App(): JSX.Element {
  return (
    <ScrollView style={styles.app}>
      <FeedPost />
      <FeedPost />
      <FeedPost />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
