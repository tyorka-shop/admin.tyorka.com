import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { navigate } from "gatsby";

export const createApolloClient = (uri: string) => {
  const httpLink = new HttpLink({
    uri,
    credentials: "include",
  });

  const errorLink = onError(({ graphQLErrors }) => {
    if (
      (graphQLErrors || []).some((error) => error.message === "Unauthorized") && window.location.pathname !== '/login'
    ) {
      navigate("/login");
    }
  });

  const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });

  return client;
};
