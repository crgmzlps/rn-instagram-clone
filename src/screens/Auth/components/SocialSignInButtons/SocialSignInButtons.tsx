import React from 'react';
import CustomButton from '../CustomButton';
import {Auth} from 'aws-amplify';
import {CognitoHostedUIIdentityProvider} from '@aws-amplify/auth';
import {Alert} from 'react-native';

const SocialSignInButtons = () => {
  const onSignInFacebook = async () => {
    try {
      await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Facebook,
      });
    } catch (error) {
      Alert.alert('Ops', (error as Error).message);
    }
  };

  const onSignInGoogle = () => {
    console.warn('onSignInGoogle');
  };

  const onSignInApple = () => {
    console.warn('onSignInApple');
  };

  return (
    <>
      <CustomButton
        text="Sign In with Facebook"
        onPress={onSignInFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      />
      <CustomButton
        text="Sign In with Google"
        onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      <CustomButton
        text="Sign In with Apple"
        onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  );
};

export default SocialSignInButtons;
