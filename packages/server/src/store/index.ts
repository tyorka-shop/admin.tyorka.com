import { Inject, Service } from "typedi";
import { promises as fs, existsSync } from "fs";
import { join } from "path";
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
import { migrations } from './migrations'
import { LoggerService } from "../services/LoggerService";

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
  private cache: Schema | undefined
  private logger = new LoggerService("storage");

  constructor(@Inject("config") private config: Config) {
    const filename = join(config.storeFolder, fileName);
    if (!existsSync(filename)) {
      console.log("Create new store");
      this.save({
        ...initialState,
        migrations: migrations.length
      });
    }
    this.migrate();
  }

  async migrate() {
    let json = await this.get();

    const migrationsToProceed = migrations.slice(json.migrations || 0);

    if(!migrationsToProceed.length){
      this.logger.log('Migration is not needed')
      return;
    }

    json = await migrationsToProceed.reduce(
      (promise, exec, i) =>
        promise
          .then((json) => exec(json, this.logger))
          .catch((e) => {
            this.logger.error(`Can not execute migration ${i}`);
            this.logger.error(e);
            process.exit(-1);
          }),
      Promise.resolve(json)
    );

    json.migrations = migrations.length;

    await this.save(json);
    this.logger.log('Migrations finished')
  }

  async get() {
    if(this.cache){
      return this.cache;
    }
    const result = await fs.readFile(
      join(this.config.storeFolder, fileName),
      "utf8"
    );
    this.cache = JSON.parse(result) as Schema;
    return this.cache;
  }

  async save(json: Schema, setDraft = true) {
    this.cache = json;
    if (setDraft) {
      json.isDraft = true;
    }
    const tempFilename = join(this.config.storeFolder, `.~${fileName}`);
    const actualFilename = join(this.config.storeFolder, fileName);
    await fs.writeFile(tempFilename, JSON.stringify(json, null, 2));
    await fs.rename(tempFilename, actualFilename);
  }

  getProducts = async (): Promise<Product[]> => {
    const { products } = await this.get();
    return products.map((product) => ({
      ...product,
      title: this.getMultiLng(product.title),
      description: this.getMultiLng(product.description),
    }))
    .sort((a, b) => b.createdAt - a.createdAt);
  };

  getGallery = async (): Promise<GalleryItem[]> => {
    const { products, gallery } = await this.get();
    return (
      await Promise.all(
        gallery
          .map((id) => products.find((product) => product.id === id))
          .map(async (product) => {
            if (!product?.coverId) {
              return;
            }
            const cover = await this.getPicture(product.coverId);
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
      )
    ).filter(Boolean) as GalleryItem[];
  };

  getShop = async (): Promise<ShopItem[]> => {
    const { products } = await this.get();
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

  getInstaPosts = async (): Promise<InstaPost[]> => {
    const { instaPosts } = await this.get();
    return instaPosts;
  };

  getProduct = async (id: ID): Promise<Product | undefined> => {
    const products = await this.getProducts();
    return products.find((product) => product.id === id);
  };

  getProductCover = async (id: ID): Promise<Picture> => {
    const product = await this.getProduct(id);

    if (!product) {
      throw new Error("Can not find product");
    }
    if (!product.coverId) {
      throw new Error("Cover not selected");
    }

    const cover = await this.getPicture(product.coverId);
    if (cover) {
      return cover;
    }

    const firstPictureId = product.pictures[0];

    if (!firstPictureId) {
      throw new Error("There is not pictures for this product");
    }
    const firstPicture = await this.getPicture(firstPictureId);

    if (!firstPicture) {
      throw new Error("Loose picture");
    }
    return firstPicture;
  };

  getProductPictures = async (id: ID): Promise<Picture[]> => {
    const product = await this.getProduct(id);

    if (!product) {
      throw new Error("Can not find product");
    }

    return (
      await Promise.all(product.pictures.map((id) => this.getPicture(id)))
    ).filter(Boolean) as Picture[];
  };

  getPictures = async (): Promise<Picture[]> => {
    const { pictures } = await this.get();
    return pictures;
  };

  getPicture = async (id: ID): Promise<Picture | undefined> => {
    const pictures = await this.getPictures();
    return pictures.find((picture) => picture.id === id);
  };

  private async fixGallery(product: Product) {
    const state = await this.get();

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

  async saveProduct(newProduct: Product) {
    const state = await this.fixGallery(newProduct);

    const index = state.products.findIndex(({ id }) => id === newProduct.id);

    if (index === -1) {
      state.products.push(newProduct);
    } else {
      state.products[index] = newProduct;
    }

    await this.save(state);
    return true;
  }

  async addPicture(filename: string, size: Size, color: string) {
    const state = await this.get();
    const picture = Picture.create(filename, size, color);

    state.pictures.push(picture);
    await this.save(state);
    return picture;
  }

  async saveCrop(id: ID, crop: Crop) {
    const state = await this.get();
    const pic = state.pictures.find((picture) => picture.id === id);
    if (!pic) {
      throw Error("Can not filen picture");
    }

    pic.crop = crop;
    await this.save(state);
  }

  async saveGalleryOrder(list: String[]) {
    const state = await this.get();

    state.gallery = list;
    await this.save(state);
  }

  async saveInstaPosts(posts: InstaPost[]) {
    const state = await this.get();
    state.instaPosts = posts;
    await this.save(state);
  }

  async getIsDraft() {
    const { isDraft } = await this.get();
    return isDraft;
  }

  async getPublications() {
    const { publications } = await this.get();
    return publications || [];
  }

  async getPublication(id: string) {
    const { publications } = await this.get();
    return publications.find((publication) => publication.id === id);
  }

  async publish(build: Build) {
    const state = await this.get();
    state.publications = [build, ...(state.publications || [])].slice(0, 10);
    state.isDraft = build.status !== BuildStatus.DONE;
    await this.save(state, false);
  }

  async getPublicationDuration() {
    const publications = await this.getPublications();
    const done = publications.filter(
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
