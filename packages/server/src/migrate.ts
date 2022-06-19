import Container from "typedi";
import { setupConfig } from "./config";
import { defaultMultilang } from "./entity/Product";
import { Storage } from "./storage";
import { Schema } from "./types";
import { State } from "./types/State";

async function main() {
  await setupConfig();

  const json: Schema = require("../store/index.json");

  const storage = Container.get(Storage);

  const pictures = json.pictures.map((picture) =>
    storage.pictures.create({
      id: picture.id,
      color: picture.color,
      crop: picture.crop,
      originalSize: picture.originalSize,
      src: picture.src,
    })
  );

  const storedPictures = await storage.pictures.save(pictures);

  const galleryOrder = json.gallery.reduce((result, id, index) => ({
    ...result,
    [id]: index
  }), {} as Record<string, number>)

  const products = json.products.map(product => 
    storage.products.create({
      id: product.id,
      state: [State.DRAFT, State.PUBLISHED, State.ARCHIVED][product.state as unknown as number],
      title: defaultMultilang(product.title),
      description: defaultMultilang(product.description),
      showInGallery: product.showInGallery,
      showInShop: product.showInShop,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      pictures: storedPictures.filter(pic => product.pictures.includes(pic.id)),
      cover: storedPictures.find(pic => pic.id === product.coverId),
      index: galleryOrder[product.id]
    })
  )

  await storage.products.save(products);

  
}

main();
