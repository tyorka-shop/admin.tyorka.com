import Koa from "koa";
import Container from "typedi";
import { Config } from "../config";
import { timingSafeEqual } from "crypto";
import { SessionServiceClient } from "../clients/session";

export const checkAuthMiddleware =
  (onFailure: (ctx: Koa.Context) => void): Koa.Middleware =>
  async (ctx, next) => {
    const config = Container.get<Config>("config");
    const builderToken = ctx.header["x-auth"];

    if (
      typeof builderToken === "string" &&
      timingSafeEqual(
        Buffer.from(builderToken, "utf-8"),
        Buffer.from(config.builderToken, "utf-8")
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
