import "reflect-metadata";
import { makeExecutableSchema } from "graphql-tools";
import { buildTypeDefsAndResolvers } from "type-graphql";
import graphqlHTTP from "koa-graphql";
import { Container } from "typedi";
// @ts-ignore
import compose from "koa-compose";
import { QueryResolver } from "./Query";
import { MutationsResolver } from "./Mutations";
import { ProductResolver } from "./Product";
import { ShopItemResolver } from "./ShopItem";
import { checkAuthMiddleware } from "../middleware/checkAuth";
import { PictureResolver } from "./Picture";

const unauthorizedError = {
  errors: [{ message: "Unauthorized" }],
  data: null,
};

export const bootstrap = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      QueryResolver,
      MutationsResolver,
      ProductResolver,
      ShopItemResolver,
      PictureResolver
    ],
    container: Container,
    emitSchemaFile: true
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const checkAuth = checkAuthMiddleware((ctx) => {
    ctx.status = 200;
    ctx.body = unauthorizedError;
  });

  const mw = graphqlHTTP((req, res, ctx) => ({
    schema,
    context: ctx.state.user || {}
  }));

  return compose([checkAuth, mw]);
};
