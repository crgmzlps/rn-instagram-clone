import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import {useForm} from 'react-hook-form';
import {SignInNavigationProp} from '../../../types/navigation';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import FormInput from '../components/FormInput';
import {Auth} from 'aws-amplify';

type SignInData = {
  username: string;
  password: string;
};

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);
  const {height} = useWindowDimensions();
  const navigation = useNavigation<SignInNavigationProp>();

  const {control, handleSubmit, reset} = useForm<SignInData>();

  const onSignInPressed = async ({username, password}: SignInData) => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      await Auth.signIn(username, password);
    } catch (error) {
      if ((error as Error).name === 'UserNotConfirmedException') {
        navigation.navigate('Confirm email', {username});
      } else {
        Alert.alert('Oopps', (error as Error).message);
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('Forgot password');
  };

  const onSignUpPress = () => {
    navigation.navigate('Sign up');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />

        <FormInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <FormInput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 3,
              message: 'Password should be minimum 3 characters long',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Loading...' : 'Sign In'}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
