import {
  ApolloClient as ApolloClientLib,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import {AuthOptions, createAuthLink, AUTH_TYPE} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';
import React, {ReactNode} from 'react';
import config from '../aws-exports';

interface IApolloClientProps {
  children: ReactNode;
}

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;
const auth: AuthOptions = {
  type: config.aws_appsync_authenticationType as AUTH_TYPE.API_KEY,
  apiKey: config.aws_appsync_apiKey,
};
const httpLink = createHttpLink({uri: url});

const link = ApolloLink.from([
  createAuthLink({url, region, auth}),
  createSubscriptionHandshakeLink({url, region, auth}, httpLink),
]);

const client = new ApolloClientLib({
  link,
  cache: new InMemoryCache(),
});

const ApolloClient = ({children}: IApolloClientProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClient;
