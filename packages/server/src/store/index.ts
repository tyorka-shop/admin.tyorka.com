import { Inject, Service } from "typedi";
import { promises as fs, existsSync } from "fs";
import { join } from "path";
import { Schema } from "../types";
import { Config } from "../config";
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
}
