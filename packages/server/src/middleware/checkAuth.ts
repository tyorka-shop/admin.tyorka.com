import Koa from "koa";
import Container from "typedi";
import { Auth } from "../auth";
import { Config } from "../config";
import { timingSafeEqual } from "crypto";

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

    const auth = Container.get(Auth);
    const payload = await auth.extract(ctx);
    if (!payload) {
      return onFailure(ctx);
    }
    ctx.state.user = payload;
    await next();
  };
