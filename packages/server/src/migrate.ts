import Container from "typedi";
import { setupConfig } from "./config";
import { Storage } from "./storage";
import { Schema } from "./types";

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

  await storage.pictures.save(pictures);

  const products = json.products.map(product => 
    storage.products.create({
      id: product.id,
      state: product.state,
      title: product.title,
      description: product.description,
      showInGallery: product.showInGallery,
      showInShop: product.showInShop,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    })
  )

  await storage.products.save(products);
}

main();
