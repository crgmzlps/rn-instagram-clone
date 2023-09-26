import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from './theme/colors';
import fonts from './theme/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

function App(): JSX.Element {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        Hello React Native <AntDesign name="stepforward" size={18} />
      </Text>
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
