import "reflect-metadata";
import Koa from "koa";
import serve from "koa-static";
import mount from "koa-mount";
import { Container } from "typedi";
import cors from "@koa/cors";
import { Config } from "./config";
import { setupConfig } from "./config";
import { router as uploadRouter } from "./routes/upload";
import { router as loginRouter } from "./routes/login";
import { bootstrap } from "./resolvers";

const app = new Koa();

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

const main = async () => {
  await setupConfig();
  const { imagesFolder } = Container.get<Config>("config");

  app.use(mount("/static/images", serve(imagesFolder)));

  const mw = await bootstrap();
  app.use(mount("/graphql", mw));

  app.listen(3000);
  console.log("listening on port 3000");
};

main();
