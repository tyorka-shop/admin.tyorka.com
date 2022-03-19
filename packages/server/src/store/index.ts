import { Inject, Service } from "typedi";
import * as fs from "fs";
import * as path from "path";
import { ID, Schema, Product, InstaPost } from "../types";
import { Picture } from "../types/Picture";
import { Size } from "../types/Size";
import { Crop } from "../types/Crop";
import { GalleryItem } from "../types/GalleryItem";
import { ShopItem } from "../types/ShopItem";
import { Config } from "../config";
import { Build } from "../types/Build";
import { BuildStatus } from "../types/BuildStatus";
import { MultiLang } from "../types/MultiLang";

const fileName = "index.json";

const initialState: Schema = {
  gallery: [],
  pictures: [],
  products: [],
  instaPosts: [],
  isDraft: false,
  publications: [],
};

@Service()
export class Store {
  constructor(@Inject("config") private config: Config) {
    const filename = path.join(config.storeFolder, fileName);
    if (!fs.existsSync(filename)) {
      console.log("Create new store");
      this.save(initialState);
    }
  }
  get() {
    const result = fs.readFileSync(
      path.join(this.config.storeFolder, fileName),
      "utf-8"
    );
    return JSON.parse(result) as Schema;
  }

  getDirname() {
    return this.config.storeFolder;
  }

  save(json: Schema, setDraft = true) {
    if (setDraft) {
      json.isDraft = true;
    }
    const tempFilename = path.join(this.config.storeFolder, `.~${fileName}`);
    const actualFilename = path.join(this.config.storeFolder, fileName);
    fs.writeFileSync(tempFilename, JSON.stringify(json, null, 2));
    fs.renameSync(tempFilename, actualFilename);
  }

  getProducts = (): Product[] =>
    this.get().products.map((product) => ({
      ...product,
      title: this.getMultiLng(product.title),
      description: this.getMultiLng(product.description),
    }));

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
          description: this.getMultiLng(product.description),
          title: this.getMultiLng(product.title),
        };
      })
      .filter(Boolean) as ShopItem[];
  };

  private getMultiLng(value: MultiLang | string | undefined): MultiLang {
    if (typeof value === "object") {
      return value;
    }
    return { en: undefined, ru: value };
  }

  getInstaPosts = (): InstaPost[] => {
    const { instaPosts } = this.get();
    return instaPosts;
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

  getPictures = (): Picture[] => this.get().pictures;

  getPicture = (id: ID): Picture | undefined =>
    this.getPictures().find((picture) => picture.id === id);

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

  saveInstaPosts(posts: InstaPost[]) {
    const state = this.get();
    state.instaPosts = posts;
    this.save(state);
  }

  getIsDraft() {
    return this.get().isDraft;
  }

  getPublications() {
    return this.get().publications || [];
  }

  getPublication(id: string) {
    const { publications } = this.get();
    return publications.find((publication) => publication.id === id);
  }

  publish(build: Build) {
    const state = this.get();
    state.publications = [build, ...(state.publications || [])].slice(0, 10);
    state.isDraft = build.status !== BuildStatus.DONE;
    this.save(state, false);
  }

  getPublicationDuration() {
    const done = this.getPublications().filter(
      (publication) =>
        publication.status === BuildStatus.DONE && publication.duration
    );
    if (!done.length) {
      return 60_000;
    }
    return (
      done.reduce(
        (result, publication) => result + (publication.duration || 0),
        0
      ) / done.length
    );
  }
}
