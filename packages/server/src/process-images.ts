import "reflect-metadata";
import { join } from "path";
import Container from "typedi";
import { Config } from "./config";
import { setupConfig } from "./config";
import { resize } from "./image-processing";
import { crop } from "./image-processing/square";
import { Storage } from "./storage";

const processImages = async () => {
  const { imagesFolder } = Container.get<Config>("config");
  const storage = Container.get(Storage);

  const pictures = await storage.pictures.find();

  await pictures.reduce(
    (promise, picture) =>
      promise.then(async () => {
        console.log("File:", picture.src);
        const fullPathname = join(imagesFolder, picture.src);
        await resize(fullPathname, true).catch((e) => console.log(e.message));
        await crop(fullPathname, picture.crop, true).catch((e) =>
          console.log(e.message)
        );
      }),
    Promise.resolve()
  );
};

export const init = async () => {
  try {
    await setupConfig();
    await processImages();
  } catch (e: any) {
    console.log(e.message || e);
  }
};

init();
