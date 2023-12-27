import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://51.20.137.159:8080/graphql',
  cache: new InMemoryCache(),
});
