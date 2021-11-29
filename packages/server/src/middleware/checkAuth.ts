import Koa from "koa";
import Container from "typedi";
import { Auth } from "../auth";

export const checkAuthMiddleware = (onFailure: (ctx: Koa.Context) => void): Koa.Middleware => async (ctx, next) => {
  const auth = Container.get(Auth);
  const payload = await auth.extract(ctx);
  if (!payload) {
    return onFailure(ctx);
  }
  ctx.state.user = payload;
  await next();
};