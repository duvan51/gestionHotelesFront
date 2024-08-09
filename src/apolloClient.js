import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
 // uri: 'https://gestion-hoteles-backend-a9eb313dd396.herokuapp.com/graphql', // Cambia esto a la URL de tu servidor GraphQL

  uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  // Si tienes autenticación, agrega el token aquí
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export default client;