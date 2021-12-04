import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Root } from "./components/Root";
import { createApolloClient } from "./apollo";
import { Config } from "./types/common";
import config from "../config.json";

interface Ctx {
  config: Config;
}

const ctx = {
  config,
};

const client = createApolloClient(config.backendUrl);

export const Context = React.createContext<Ctx>(ctx);

export const App: React.FC = () => {
  return (
    <Context.Provider value={ctx}>
      <ApolloProvider client={client}>
        <Root />
      </ApolloProvider>
    </Context.Provider>
  );
};
