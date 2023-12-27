import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://13.49.76.232:8080/graphql',
  credentials: 'include', // Include credentials for cross-origin requests
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache', // Disable cache for watch queries
    },
    query: {
      fetchPolicy: 'no-cache', // Disable cache for regular queries
    },
  },
});
