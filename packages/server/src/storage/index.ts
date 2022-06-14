import { join } from "path";
import { Inject, Service } from "typedi";
import { DataSource, IsNull, Not, Repository } from "typeorm";
import { LoggerService } from "../services/LoggerService";
import { Config } from "../config";
import { Picture } from "../entity/Picture";
import { Product } from "../entity/Product";
import { BlogPost } from "../entity/BlogPost";
import { GalleryItem } from "../types/GalleryItem";
import { ProductInput } from "../types/Product";
import { Build } from "../entity/Build";

const file = "db.sqlite";

@Service()
export class Storage {
  private db: DataSource;

  pictures: Repository<Picture>;
  products: Repository<Product>;
  blog: Repository<BlogPost>;
  builds: Repository<Build>;

  private logger = new LoggerService("db");

  constructor(@Inject("config") config: Config) {
    const filename = join(config.storeFolder, file);
    this.logger.log("Connect to", filename);
    this.db = new DataSource({
      type: "sqlite",
      database: filename,
      entities: ["src/entity/*"],
      migrations: [],
      migrationsTableName: "migrations",
      logging: ["error", "log", "query"],
      logger: "simple-console",
      synchronize: true,
    });

    this.pictures = this.db.getRepository(Picture);
    this.products = this.db.getRepository(Product);
    this.blog = this.db.getRepository(BlogPost);
    this.builds = this.db.getRepository(Build);
  }

  init = async () => {
    await this.db.initialize();
    this.logger.log(this.db.isInitialized);
  };

  saveProduct = async ({ pictures: picIds, coverId, ...value }: ProductInput) => {
    const pictures = await this.pictures.find({
      where: picIds.map((id) => ({ id })),
    });

    let cover: Picture | null = null;
    if(coverId) {
      cover = await this.pictures.findOne({
        where: { id: coverId }
      })
    }
    else if(picIds[0]) {
      cover = await this.pictures.findOne({
        where: { id: picIds[0] }
      })
    }

    return this.products.save(
      Product.fromProductInput(value, pictures, cover)
    );
  }

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
        cover: true
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

  getShop = async () => {
    const products = await this.products.find({
      where: {
        showInShop: true,
        cover: Not(IsNull()),
        price: Not(IsNull()),
        title: Not(IsNull()),
      },
      order: {
        createdAt: "DESC",
      },
    });
    return products.map((product) => ({
      ...product,
      price: product.price!,
    }));
  };
}
