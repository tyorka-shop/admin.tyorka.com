import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Root } from "./components/Root";
import { createApolloClient } from "./apollo";
import { Config } from "./types/common";
import config from "../configs/main.json";

const client = createApolloClient();

interface Ctx {
  config: Config;
}

const ctx = {
  config: config as Config,
};

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
