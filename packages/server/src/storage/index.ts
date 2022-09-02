import { join } from "path";
import { Inject, Service } from "typedi";
import { DataSource, IsNull, Not, Repository } from "typeorm";
import { DBLoggingService } from "../services/DBLoggerService";
import { Config } from "../config";
import { Picture } from "../entity/Picture";
import { Product } from "../entity/Product";
import { BlogPost } from "../entity/BlogPost";
import { GalleryItem } from "../types/GalleryItem";
import { ProductInput } from "../types/Product";
import { Build } from "../entity/Build";
import { ShopItem } from "../types/ShopItem";
import { PictureOrder } from "../entity/PictureOrder";
import { ShopOrder } from "../entity/ShopOrder";

const file = "db.sqlite";

@Service()
export class Storage {
  private db: DataSource;

  pictures: Repository<Picture>;
  products: Repository<Product>;
  blog: Repository<BlogPost>;
  builds: Repository<Build>;
  picturesOrder: Repository<PictureOrder>;
  shopOrder: Repository<ShopOrder>;

  constructor(
    @Inject("config") config: Config,
    @Inject(() => DBLoggingService) private logger: DBLoggingService
  ) {
    const filename = join(config.storeFolder, file);
    this.logger.log("log", `Connect to ${filename}`);
    this.db = new DataSource({
      type: "sqlite",
      database: filename,
      entities: [Product, Picture, BlogPost, Build, PictureOrder, ShopOrder],
      migrations: [],
      migrationsTableName: "migrations",
      logging: false,
      logger: this.logger,
      synchronize: true,
    });

    this.pictures = this.db.getRepository(Picture);
    this.products = this.db.getRepository(Product);
    this.blog = this.db.getRepository(BlogPost);
    this.builds = this.db.getRepository(Build);
    this.picturesOrder = this.db.getRepository(PictureOrder);
    this.shopOrder = this.db.getRepository(ShopOrder);
  }

  init = async () => {
    await this.db.initialize();
    this.logger.log("log", this.db.isInitialized ? "ok" : "not initialized");
  };

  saveProduct = async ({
    pictures: picIds,
    coverId,
    ...value
  }: ProductInput) => {
    const pictures = await this.pictures.find({
      where: picIds.map((id) => ({ id })),
    });

    let cover: Picture | null = null;
    if (coverId) {
      cover = await this.pictures.findOne({
        where: { id: coverId },
      });
    } else if (picIds[0]) {
      cover = await this.pictures.findOne({
        where: { id: picIds[0] },
      });
    }

    const product = await this.products.save(
      Product.fromProductInput(value, pictures, cover)
    );

    await this.picturesOrder.delete({
      productId: product.id,
    });

    await this.picturesOrder.save(
      picIds.map(
        (pictureId, index) =>
          new PictureOrder({ pictureId, productId: product.id, index })
      )
    );

    return product;
  };

  getGallery = async (): Promise<GalleryItem[]> => {
    const products = await this.products.find({
      where: {
        showInGallery: true,
        cover: Not(IsNull()),
      },
      order: {
        index: "ASC",
      },
      relations: {
        pictures: true,
        cover: true,
      },
    });

    return products.map((product) => ({
      id: product.id,
      color: product.cover!.color,
      src: product.cover!.src,
      ...product.cover!.originalSize,
    }));
  };

  saveGalleryOrder = async (list: string[]) => {
    const indexes = list.reduce(
      (result, id, index) => ({
        ...result,
        [id]: index,
      }),
      {} as Record<string, number>
    );

    const products = await this.products.find();

    products.forEach((product) => {
      product.index = product.id in indexes ? indexes[product.id] : undefined;
    });

    await this.products.save(products);
  };

  saveShopOrder = async (list: string[]) => {
    const shopOrder = list.map(
      (productId, index) =>
        new ShopOrder({
          productId: productId,
          index,
        })
    );

    await this.shopOrder.delete({});

    await this.shopOrder.save(shopOrder);
  };

  getShop = async () => {
    const products = await this.products.find({
      where: {
        showInShop: true,
        cover: Not(IsNull()),
        price: Not(IsNull()),
      },
      relations: {
        cover: true,
      },
    });

    const shopOrder = await this.shopOrder.find({});

    return products
      .map((product) => ({
        product,
        index:
          shopOrder.find((item) => item.productId === product.id)?.index || 0,
      }))
      .sort((a, b) => a.index - b.index)
      .map(({ product }) => ShopItem.fromEntity(product));
  };
}
