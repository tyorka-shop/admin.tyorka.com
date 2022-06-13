import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Converter } from "showdown";
import { markdownToTxt } from "markdown-to-txt";
import { MultiLang } from "../types/MultiLang";
import { Picture } from "../types/Picture";
import { Product } from "../types/Product";
import { Storage } from "../storage";

const MDConverter = new Converter();
MDConverter.setOption("simplifiedAutoLink", true);

@Service()
@Resolver(Product)
export class ProductResolver {
  @Inject(() => Storage)
  private storage: Storage;

  @FieldResolver(() => [Picture])
  async pictures(@Root() { id }: Product): Promise<Picture[]> {
    const product = await this.storage.products.findOne({
      where: { id },
      relations: {
        pictures: true,
      },
    });

    return product?.pictures || [];
  }

  // @FieldResolver(() => Picture, {nullable: true})
  // async cover(@Root() { coverId }: Product): Promise<Picture | null> {
  //   return !coverId ? null : this.storage.pictures.findOne({
  //     where: { id: coverId },
  //   });
  // }

  @FieldResolver(() => MultiLang)
  descriptionHTML(@Root() { description }: Product) {
    return {
      en: MDConverter.makeHtml(description?.en || ""),
      ru: MDConverter.makeHtml(description?.ru || ""),
    };
  }

  @FieldResolver(() => MultiLang)
  descriptionText(@Root() { description }: Product) {
    return {
      en: markdownToTxt(description?.en || ""),
      ru: markdownToTxt(description?.ru || ""),
    };
  }
}
