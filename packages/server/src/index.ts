import "reflect-metadata";
import {resolve } from 'path'
import Koa from "koa";
import serve from "koa-static";
import mount from "koa-mount";
import { Container } from "typedi";
import cors from "@koa/cors";
import Pug from 'koa-pug';
import { Config, setupConfig } from "./config";
import { router as uploadRouter } from "./routes/upload";
import { router as loginRouter } from "./routes/login";
import { router as buildRouter } from "./routes/build";
import { bootstrap } from "./resolvers";

const app = new Koa();
export const pug = new Pug({
  viewPath: resolve(__dirname, './templates'),
  app
})

app.use(
  cors({
    credentials: true,
  })
);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = 500;
    ctx.body = err.message;
    app.emit("error", err, ctx);
  }
});

process.on("unhandledRejection", (error) => {
  app.emit("error", error);
});

app.on("error", (err, ctx) => {
  console.error(err, ctx);
});


app.use(uploadRouter.routes());
app.use(loginRouter.routes());
app.use(buildRouter.routes());

const main = async () => {
  await setupConfig()
  const { imagesFolder } = Container.get<Config>("config");
  
  app.use(mount("/static/images", serve(imagesFolder)));
  
  const mw = await bootstrap();
  app.use(mount("/graphql", mw));

  app.listen(3000);
  console.log("listening on port 3000");

};

main();
