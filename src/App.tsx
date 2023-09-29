import React from 'react';
import {Amplify} from 'aws-amplify';
import Navigation from './navigation';

import config from './aws-exports';

Amplify.configure(config);

function App(): JSX.Element {
  return <Navigation />;
}

export default App;
