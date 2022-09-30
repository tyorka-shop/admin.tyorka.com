import { ApolloClient, InMemoryCache, from, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "apollo-link-context";
import { navigate } from "gatsby";
import { parse } from "cookie";

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

  const authLink = new ApolloLink((operation, forward) => {
    const access_token = getAccessToken();
    operation.setContext({
      headers: {
        authorization: access_token ? `Bearer ${access_token}` : "",
      },
    });
    return forward(operation);
  });


  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, authLink, httpLink]),
  });

  return client;
};

const getAccessToken = (): string | null => {
  try {
    return parse(document.cookie).access_token;
  } catch (e) {
    console.log(e);
    return null;
  }
};
