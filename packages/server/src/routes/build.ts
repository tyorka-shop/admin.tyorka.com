import Router from "@koa/router";
import { build, getLog } from '../builder'
import { pug } from "..";

export const router = new Router({
  prefix: "/build",
});

router.post("/", async (ctx) => {
  const cmd = build();
  ctx.body = JSON.stringify({"pid": cmd.pid})
  ctx.status = 200;
});

const statusToCaption = {
  pending: 'Pending',
  success: 'Done',
  failure: 'Error'
}

router.get("/",  async (ctx) => {
  const {log, status} = getLog();
  // @ts-ignore
  ctx.body = await pug.render('build', {
    log,
    status,
    statusText: status
  })
  ctx.status = 200;
})
