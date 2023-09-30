import React from 'react';
import {Amplify} from 'aws-amplify';
import Navigation from './src/navigation';
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import config from './src/aws-exports';
Amplify.configure(config);

function App(): JSX.Element {
  return <Navigation />;
}

export default withAuthenticator(App);

/* //old way

import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: '#5c78ff',
    borderRadius: 100,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: colors.primary,
  }
}

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Full name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string',
      placeholder: 'Full name',
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string',
      placeholder: 'Email',
    },
    {
      label: 'Username',
      key: 'username',
      required: true,
      displayOrder: 3,
      type: 'string',
      placeholder: 'Username/handle',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 4,
      type: 'password',
      placeholder: 'Password',
    },
  ],
};

export default withAuthenticator(App, signUpConfig, theme: customTheme); */
