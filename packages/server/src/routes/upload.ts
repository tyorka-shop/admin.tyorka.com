import * as os from "os";
import { promises as fs } from "fs";
import { createHash } from "crypto";
import { extname, resolve } from "path";
import Router from "@koa/router";
import koaBody from "koa-body";
import type { Files, File } from "formidable";
import { config } from "..";
import { Container } from 'typedi'
import { getSize, resize } from "../image-processing";
import { Store } from "../store";

export const router = new Router({
  prefix: "/upload",
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
  const newPath = resolve(config.imagesFolder, newFilename);

  await fs.writeFile(newPath, content);
  return newFilename;
};

router.post("/", mw, async (ctx) => {
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

  const fullPathname = resolve(config.imagesFolder, filename);

  await resize(fullPathname, [200, 600]);

  const { width, height, dominantColor } = await getSize(fullPathname);
  const store = Container.get(Store);

  const picture = store.addPicture(filename, { width, height }, dominantColor);

  ctx.body = picture;

  ctx.status = 200;
});
