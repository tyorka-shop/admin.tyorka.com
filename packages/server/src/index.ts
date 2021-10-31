import "reflect-metadata"
import Koa from "koa";
import serve from "koa-static";
import mount from "koa-mount";
import cors from "@koa/cors";
import { router as uploadRouter } from "./routes/upload";
import { root } from "./store";
import { bootstrap } from "./resolvers";

export const config = require("./config.json");

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

app.use(mount("/static", serve(root)));

app.use(uploadRouter.routes());

const main = async () => {
  const mw = await bootstrap();
  app.use(mount("/graphql", mw));
  
  app.listen(3000);
  console.log("listening on port 3000");
};

main();