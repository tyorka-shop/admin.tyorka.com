import { join } from "path";
import { Inject, Service } from "typedi";
import { DataSource, Repository } from "typeorm";
import { LoggerService } from "../services/LoggerService";
import { Config } from "../config";
import { Picture } from "../entity/Picture";
import { Product } from "../entity/Product";
import { BlogPost } from "../entity/BlogPost";

const file = "db.sqlite";

@Service()
export class Storage {
  private db: DataSource;

  pictures: Repository<Picture>;
  products: Repository<Product>;
  blog: Repository<BlogPost>;

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
  }

  init = async () => {
    await this.db.initialize();
    this.logger.log(this.db.isInitialized);
  };
}
