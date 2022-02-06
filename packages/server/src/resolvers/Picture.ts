import { promises as fs } from "fs";
import { join } from "path";
import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Config } from "../config";
import { IMAGE_SIZES } from "../consts";
import { Picture } from "../types/Picture";

@Service()
@Resolver(Picture)
export class PictureResolver {
  @Inject("config")
  private config: Config;

  @FieldResolver(() => String)
  async inline(@Root() { src }: Picture): Promise<string> {
    const [basename, ext] = src.split(".");
    const smallest = Math.min(...IMAGE_SIZES);
    const filename = join(
      this.config.imagesFolder,
      `${basename}_${smallest}.${ext}`
    );
    const content = await fs.readFile(filename, "binary");
    const result = Buffer.from(content).toString("base64");
    return `data:image/jpeg;base64,${result}`;
  }
}
