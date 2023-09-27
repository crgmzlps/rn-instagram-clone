import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

interface IButtonProps {
  text?: string;
  onPress?: () => void;
}

const Button = ({text = 'Sample button', onPress = () => {}}: IButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: colors.black,
    fontWeight: fonts.weight.semi,
  },
});

export default Button;
