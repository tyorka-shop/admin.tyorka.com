import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Converter } from 'showdown'
import { markdownToTxt } from 'markdown-to-txt'
import { Store } from "../store";
import { MultiLang } from "../types/MultiLang";
import { Picture } from "../types/Picture";
import { Product } from "../types/Product";

const MDConverter = new Converter()
MDConverter.setOption('simplifiedAutoLink', true)

@Service()
@Resolver(Product)
export class ProductResolver {
  @Inject(() => Store)
  private store: Store;

  @FieldResolver(() => [Picture])
  async pictures(@Root() { id }: Product): Promise<Picture[]> {
    return this.store.getProductPictures(id)
  }

  @FieldResolver(() => Picture)
  async cover(@Root() { id }: Product): Promise<Picture> {
    return this.store.getProductCover(id)
  }

  @FieldResolver(() => MultiLang)
  descriptionHTML(@Root() { description }: Product) {
    return {
      en: MDConverter.makeHtml(description?.en || ''),
      ru: MDConverter.makeHtml(description?.ru || '')
    }
  }

  @FieldResolver(() => MultiLang)
  descriptionText(@Root() { description }: Product) {
    return {
      en: markdownToTxt(description?.en || ''),
      ru: markdownToTxt(description?.ru || '')
    }
  }
}
