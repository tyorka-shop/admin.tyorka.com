import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { navigate } from "gatsby";

export const createApolloClient = (uri: string) => {
  const httpLink = new HttpLink({
    uri: `${uri}/graphql`,
    credentials: "include",
  });

  const errorLink = onError(({ graphQLErrors }) => {
    const isUnauthorized = (graphQLErrors || []).some(
      (error) => error.message === "Unauthorized"
    );
    const isLoginPage = window.location.pathname !== "/login";
    if (isUnauthorized && isLoginPage) {
      navigate("/login");
    }
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink])
  });

  return client;
};
