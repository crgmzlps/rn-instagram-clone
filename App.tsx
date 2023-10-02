import React from 'react';
import {Amplify} from 'aws-amplify';
import Navigation from './src/navigation';
import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';

const updatedConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: 'notjustphotos://',
    redirectSignOut: 'notjustphotos://',
  },
};
Amplify.configure(updatedConfig);

function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}

export default App;
