import Router from "@koa/router";
import koaBody from "koa-body";
import Container from "typedi";
import { Auth } from "../auth";
import { Config } from "../config";

export const router = new Router({
  prefix: "/login",
});

router.post("/", koaBody(), async (ctx) => {
  try {
    const config = Container.get<Config>("config");
    const auth = Container.get(Auth);

    const { token, expires } = await auth.login(ctx.request.body.credential);

    ctx.cookies.set("access_token", token, { expires });
    ctx.status = 301;
    ctx.redirect(config.client_url);
  } catch (e) {
    ctx.status = 401;
  }
});
