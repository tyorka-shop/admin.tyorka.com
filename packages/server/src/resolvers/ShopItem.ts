import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Converter } from 'showdown'
import { Store } from "../store";
import { MultiLang } from "../types/MultiLang";
import { Picture } from "../types/Picture";
import { ShopItem } from "../types/ShopItem";

const MDConverter = new Converter()
MDConverter.setOption('simplifiedAutoLink', true)

@Service()
@Resolver(ShopItem)
export class ShopItemResolver {
  @Inject(() => Store)
  private store: Store;

  @FieldResolver(() => [Picture])
  async pictures(@Root() { id }: ShopItem): Promise<Picture[]> {
    return this.store.getProductPictures(id)
  }

  @FieldResolver(() => Picture)
  async cover(@Root() { id }: ShopItem): Promise<Picture> {
    return this.store.getProductCover(id)
  }

  @FieldResolver(() => MultiLang)
  descriptionHTML(@Root() { description }: ShopItem) {
    return {
      en: MDConverter.makeHtml(description?.en || ''),
      ru: MDConverter.makeHtml(description?.ru || '')
    }
  }

}
