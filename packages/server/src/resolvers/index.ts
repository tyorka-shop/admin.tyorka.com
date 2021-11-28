import "reflect-metadata";
import { makeExecutableSchema } from "graphql-tools";
import { buildTypeDefsAndResolvers } from "type-graphql";
import Koa from "koa";
import graphqlHTTP from "koa-graphql";
import { Container } from "typedi";
// @ts-ignore
import compose from "koa-compose";
import { QueryResolver } from "./Query";
import { MutationsResolver } from "./Mutations";
import { ProductResolver } from "./Product";
import { ShopItemResolver } from "./ShopItem";
import { extract } from "../auth/userInfo";

const error = {
  errors: [{ message: "Unauthorized" }],
  data: null,
};

const checkAuth: Koa.Middleware = async (ctx, next) => {
  const payload = await extract(ctx);
  if (!payload) {
    ctx.status = 200;
    ctx.body = error;
    return;
  }
  ctx.state.user = payload;
  await next();
};

export const bootstrap = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      QueryResolver,
      MutationsResolver,
      ProductResolver,
      ShopItemResolver,
    ],
    container: Container,
    emitSchemaFile: true,
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const mw = graphqlHTTP((req, res, ctx) => ({
    schema,
    context: ctx.state.user || {},
  }));

  return compose([checkAuth, mw]);
};
