import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Converter } from "showdown";
import { MultiLang } from "../types/MultiLang";
import { Picture } from "../types/Picture";
import { ShopItem } from "../types/ShopItem";
import { Storage } from "../storage";

const MDConverter = new Converter();
MDConverter.setOption("simplifiedAutoLink", true);

@Service()
@Resolver(ShopItem)
export class ShopItemResolver {
  @Inject(() => Storage)
  private storage: Storage;

  @FieldResolver(() => [Picture])
  async pictures(@Root() { id }: ShopItem): Promise<Picture[]> {
    const product = await this.storage.products.findOne({
      where: {id},
      relations: {
        pictures: true
      }
    })
    return product?.pictures || [];
  }

  @FieldResolver(() => MultiLang)
  descriptionHTML(@Root() { description }: ShopItem) {
    return {
      en: MDConverter.makeHtml(description?.en || ""),
      ru: MDConverter.makeHtml(description?.ru || ""),
    };
  }
}
