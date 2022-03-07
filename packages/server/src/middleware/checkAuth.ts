import Koa from "koa";
import Container from "typedi";
import { Config } from "../config";
import { timingSafeEqual } from "crypto";
import { SessionServiceClient } from "../clients/session";

export const checkAuthMiddleware =
  (onFailure: (ctx: Koa.Context) => void): Koa.Middleware =>
  async (ctx, next) => {
    const config = Container.get<Config>("config");
    const secret = ctx.header["x-auth"];

    if (
      typeof secret === "string" &&
      secret.length === config.secret.length &&
      timingSafeEqual(
        Buffer.from(secret, "utf-8"),
        Buffer.from(config.secret, "utf-8")
      )
    ) {
      ctx.state.user = { email: "builder@tyorka.com" };
      await next();
      return;
    }

    const sessionService = Container.get(SessionServiceClient);

    const token = ctx.cookies.get("access_token");
    if (!token) {
      return onFailure(ctx);
    }
    const payload = await sessionService.verify(token)
    if(!payload){
      return onFailure(ctx);
    }

    ctx.state.user = payload;
    await next();
  };
