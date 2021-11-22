import { Service } from "typedi";
import * as fs from "fs";
import * as path from "path";
import { ID, Schema, Product } from "../types";
import { Picture } from "../types/Picture";
import { Size } from "../types/Size";
import { Crop } from "../types/Crop";
import { GalleryItem } from "../types/GalleryItem";
import { ShopItem } from "../types/ShopItem";

export const root = "./store";

const fileName = "index.json";

const initialState: Schema = {
  gallery: [],
  pictures: [],
  products: [],
};

@Service()
export class Store {
  constructor() {
    const filename = path.join(root, fileName);
    if (!fs.existsSync(filename)) {
      console.log("Create new store");
      this.save(initialState);
    }
  }
  get() {
    const result = fs.readFileSync(path.join(root, fileName), "utf-8");
    return JSON.parse(result) as Schema;
  }

  getDirname() {
    return root;
  }

  save(json: Schema) {
    const tempFilename = path.join(root, `.~${fileName}`);
    const actualFilename = path.join(root, fileName);
    fs.writeFileSync(tempFilename, JSON.stringify(json, null, 2));
    fs.renameSync(tempFilename, actualFilename);
  }

  getProducts = (): Product[] => this.get().products;

  getGallery = (): GalleryItem[] => {
    const { products, gallery } = this.get();
    return gallery
      .map((id) => products.find((product) => product.id === id))
      .map((product) => {
        if (!product?.coverId) {
          return;
        }
        const cover = this.getPicture(product.coverId);
        if (!cover) {
          return;
        }
        return {
          id: product.id,
          color: cover.color,
          src: cover.src,
          ...cover.originalSize,
        };
      })
      .filter(Boolean) as GalleryItem[];
  };

  getShop = (): ShopItem[] => {
    const { products } = this.get();
    return products
      .map<ShopItem | undefined>((product) => {
        if (!product?.coverId) {
          return;
        }
        const cover = this.getPicture(product.coverId);
        if (!cover) {
          return;
        }
        if (!product.price || !product.showInShop || !product.title) {
          return;
        }
        return {
          ...cover,
          id: product.id,
          price: product.price,
          description: product.description,
          title: product.title,
        };
      })
      .filter(Boolean) as ShopItem[];
  };

  getProduct = (id: ID): Product | undefined =>
    this.getProducts().find((product) => product.id === id);

  getProductCover = (id: ID): Picture => {
    const product = this.getProduct(id);

    if (!product) {
      throw new Error("Can not find product");
    }
    if (!product.coverId) {
      throw new Error("Cover not selected");
    }

    const cover = this.getPicture(product.coverId);
    if (cover) {
      return cover;
    }

    const firstPictureId = product.pictures[0];

    if (!firstPictureId) {
      throw new Error("There is not pictures for this product");
    }
    const firstPicture = this.getPicture(firstPictureId);

    if (!firstPicture) {
      throw new Error("Loose picture");
    }
    return firstPicture;
  };

  getProductPictures = (id: ID): Picture[] => {
    const product = this.getProduct(id);

    if (!product) {
      throw new Error("Can not find product");
    }

    return product.pictures
      .map((id) => this.getPicture(id))
      .filter(Boolean) as Picture[];
  };

  getPicture = (id: ID): Picture | undefined =>
    this.get().pictures.find((picture) => picture.id === id);

  private fixGallery(product: Product) {
    const state = this.get();

    // remove from gallery
    if (!product.showInGallery) {
      state.gallery = state.gallery.filter((id) => product.id !== id);
      return state;
    }
    const index = state.gallery.findIndex((id) => product.id === id);
    // add to gallery
    if (index === -1) {
      state.gallery = [product.id, ...state.gallery];
    }
    return state;
  }

  saveProduct(newProduct: Product) {
    this.save(this.fixGallery(newProduct));

    const state = this.get();
    const index = state.products.findIndex(({ id }) => id === newProduct.id);

    if (index === -1) {
      state.products.push(newProduct);
    } else {
      state.products[index] = newProduct;
    }

    this.save(state);
    return true;
  }

  addPicture(filename: string, size: Size, color: string) {
    const state = this.get();
    const picture = Picture.create(filename, size, color);

    state.pictures.push(picture);
    this.save(state);
    return picture;
  }

  saveCrop(id: ID, crop: Crop) {
    const state = this.get();
    const pic = state.pictures.find((picture) => picture.id === id);
    if (!pic) {
      throw Error("Can not filen picture");
    }

    pic.crop = crop;
    this.save(state);
  }

  saveGalleryOrder(list: String[]) {
    const state = this.get();

    state.gallery = list;
    this.save(state);
  }
}
