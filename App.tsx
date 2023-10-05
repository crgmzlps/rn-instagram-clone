import React from 'react';
import {Amplify} from 'aws-amplify';
import Navigation from './src/navigation';
import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {Linking} from 'react-native';
import ApolloClient from './src/apollo/Client';

async function urlOpener(url: string, redirectUrl: string): Promise<void> {
  await InAppBrowser.isAvailable();
  const authSessionResult = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (authSessionResult.type === 'success') {
    Linking.openURL(authSessionResult.url);
  }
}

const updatedConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    redirectSignIn: 'notjustphotos://',
    redirectSignOut: 'notjustphotos://',
    urlOpener,
  },
};
Amplify.configure(updatedConfig);

function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <ApolloClient>
        <Navigation />
      </ApolloClient>
    </AuthContextProvider>
  );
}

export default App;
