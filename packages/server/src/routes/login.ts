import Router from "@koa/router";
import koaBody from "koa-body";
import Container from "typedi";
import { JWT } from "../auth";
import { Config } from "../config";
import { OAuth } from "../oauth";

export const router = new Router({
  prefix: "/login",
});

router.post("/", koaBody(), async (ctx) => {
  try {
    const config = Container.get<Config>('config');
    const oauth = Container.get(OAuth);
    const jwt = Container.get(JWT);

    const email = await oauth.verify(ctx.request.body.credential);
    console.log('Success login', email);

    const token = await jwt.createToken(email)

    ctx.cookies.set('access_token', token, {
      expires: new Date((Math.floor(Date.now() / 1000) + config.jwt.token_lifespan) * 1000)
    })
    ctx.status = 301;
    ctx.redirect(config.client_url);

  } catch (e) {
    ctx.status = 401;
  }
});
