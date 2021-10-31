import "reflect-metadata";
import { makeExecutableSchema } from "graphql-tools";
import { buildTypeDefsAndResolvers } from "type-graphql";
import graphqlHTTP from "koa-graphql";
import { Container } from "typedi";

import { QueryResolver } from "./Query";
import { MutationsResolver } from "./Mutations";
import { ProductResolver } from "./Product";

export const bootstrap = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [QueryResolver, MutationsResolver, ProductResolver],
    container: Container,
    emitSchemaFile: true
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  return graphqlHTTP({ schema })
}