import Router from "@koa/router";
import koaBody from "koa-body";

export const router = new Router({
  prefix: "/login",
});

router.post("/", koaBody(), async (ctx) => {
  console.log(ctx.request.body);
  ctx.redirect('http://localhost:8000')
});