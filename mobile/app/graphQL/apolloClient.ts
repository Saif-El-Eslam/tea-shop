import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GRAPHQL_URL } from "@env";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

// Middleware to add the authentication token to headers
const authLink = setContext(async (_, { headers }) => {
  const token = JSON.parse((await AsyncStorage.getItem("token")) || "");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Export the Apollo Client
export default client;
