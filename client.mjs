import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:8080/v1alpha1/graphql',
    headers: {
        'x-hasura-access-key': 'mylongsecretkey',
    },
  })
});

export default client
// parse CSV data


// convert into graphql


//batch upload into hasura

