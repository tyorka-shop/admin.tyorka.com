import "reflect-metadata";
import { join } from "path";
import Container from "typedi";
import { Config } from "./config";
import { setupConfig } from "./config";
import { resize } from "./image-processing";
import { crop } from "./image-processing/square";
import { Store } from "./store";

const processImages = async () => {
  const { imagesFolder } = Container.get<Config>("config");
  const store = Container.get(Store);

  const pictures = store.getPictures();

  await pictures.reduce(
    (promise, picture) =>
      promise.then(async () => {
        console.log("File:", picture.src);
        const fullPathname = join(imagesFolder, picture.src);
        await resize(fullPathname).catch((e) => console.log(e.message));
        await crop(fullPathname, picture.crop).catch((e) =>
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
