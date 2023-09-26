import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from './theme/colors';
import fonts from './theme/fonts';

function App(): JSX.Element {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Hello React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.lightgrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: fonts.size.lg,
    color: colors.white,
    backgroundColor: colors.grey,
  },
});

export default App;
