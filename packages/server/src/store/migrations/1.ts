import fs from 'fs';
import path from 'path';
import Container from "typedi";
import { Config } from '../../config';
import { Migrator } from "./types";

export const addDatesToProducts: Migrator = async (data, logger) => {
  logger.log("Add dates to products");
  const config = Container.get<Config>('config');

  data.products.forEach(product => {
    const ctime = product.pictures.map(picId => {
      const picture = data.pictures.find(pic => pic.id === picId);
      const stat = picture ? fs.statSync(path.join(config.imagesFolder, picture.src)) : undefined
      console.log(picture?.src, stat?.ctime)
      return stat ? +stat?.ctime : 0
    })
    .filter(Boolean)
    .sort((a, b) => (+a) - (+b))[0];
    product.createdAt = ctime || 0;
  });
  return data;
}
