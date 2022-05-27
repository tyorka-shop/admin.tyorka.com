import * as os from "os";
import { promises as fs } from "fs";
import { createHash } from "crypto";
import { extname, join } from "path";
import Router from "@koa/router";
import koaBody from "koa-body";
import type { Files, File } from "formidable";
import { Container } from "typedi";
import { getMeta, resize } from "../image-processing";
import { crop } from "../image-processing/square";
import { Store } from "../store";
import { Config } from "../config";
import { checkAuthMiddleware } from "../middleware/checkAuth";

export const router = new Router({
  prefix: "/upload",
});

const checkAuth = checkAuthMiddleware((ctx) => {
  ctx.status = 401;
});

const mw = koaBody({
  multipart: true,
  urlencoded: true,
  formidable: {
    keepExtensions: true,
    uploadDir: os.tmpdir(),
  },
});

const getSingleFile = ({ file }: Files): File => {
  if (Array.isArray(file)) {
    return file[0];
  }
  return file;
};

const storeFile = async (name: string, path: string) => {
  const content = await fs.readFile(path);
  const hash = createHash("md5");
  hash.update(content);
  const newFilename = `${hash.digest("hex")}${extname(name)}`;
  const config = Container.get<Config>("config");
  const newPath = join(config.imagesFolder, newFilename);

  await fs.writeFile(newPath, content);
  return newFilename;
};

router.post("/", checkAuth, mw, async (ctx) => {
  // @ts-ignore
  const { files } = ctx.request;
  if (!files) {
    throw new Error("File does not passed");
  }
  const { name, path } = getSingleFile(files);

  if (!name) {
    throw new Error("Name of file is not defined");
  }

  const filename = await storeFile(name, path);

  const config = Container.get<Config>("config");

  const fullPathname = join(config.imagesFolder, filename);

  await resize(fullPathname);

  await crop(fullPathname);

  const { width, height, dominantColor } = await getMeta(fullPathname);
  const store = Container.get(Store);

  const picture = await store.addPicture(filename, { width, height }, dominantColor);

  ctx.body = picture;

  ctx.status = 200;
});
