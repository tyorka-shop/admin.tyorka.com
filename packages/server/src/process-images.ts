import "reflect-metadata";
import { promises as fs } from "fs";
import { join } from "path";
import Container from "typedi";
import { Config, setupConfig } from "./config";
import { resize } from "./image-processing";
import { IMAGE_SIZES } from "./consts";

const processImages = async (path: string, sizes: number[]) => {
  const files = await fs.readdir(path);
  const origins = files.filter((file) => !file.match(/_\d+\./));
  await Promise.all(origins.map((origin) => resize(join(path, origin), sizes)));
};

export const init = async () => {
  try {
    await setupConfig();
    const { imagesFolder } = Container.get<Config>("config");
    await processImages(imagesFolder, IMAGE_SIZES);
  } catch (e: any) {
    console.log(e.message || e);
  }
};

init();
