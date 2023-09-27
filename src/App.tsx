import React from 'react';
import {StyleSheet, View} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import CommentsScreen from './screens/CommentsScreen';
import ProfileScreen from './screens/ProfileScreen';

function App(): JSX.Element {
  return (
    <View style={styles.app}>
      {/* <CommentsScreen /> */}
      {/* <HomeScreen /> */}
      <ProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});

export default App;
