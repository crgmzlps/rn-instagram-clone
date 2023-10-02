import React from 'react';
import {Amplify} from 'aws-amplify';
import Navigation from './src/navigation';
import config from './src/aws-exports';
import AuthContextProvider from './src/contexts/AuthContext';
Amplify.configure(config);

function App(): JSX.Element {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}

export default App;
