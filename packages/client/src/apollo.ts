import { ApolloClient, InMemoryCache } from "@apollo/client";
export const createApolloClient = (uri: string) => {
  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });

  return client;
};
