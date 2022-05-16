import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://connect-urtheaman.herokuapp.com/graphql'
      : 'http://127.0.0.1:3200/graphql',
  cache: new InMemoryCache(),
});

export default client;
