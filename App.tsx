import React from 'react';
import {Amplify} from 'aws-amplify';
import Navigation from './src/navigation';
import config from './src/aws-exports';
Amplify.configure(config);

function App(): JSX.Element {
  return <Navigation />;
}

export default App;
