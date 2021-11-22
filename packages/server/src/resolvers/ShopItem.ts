import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Store } from "../store";
import { Picture } from "../types/Picture";
import { ShopItem } from "../types/ShopItem";

@Service()
@Resolver(ShopItem)
export class ShopItemResolver {
  @Inject(() => Store)
  private store: Store;

  @FieldResolver(() => [Picture])
  pictures(@Root() { id }: ShopItem): Picture[] {
    return this.store.getProductPictures(id)
  }

  @FieldResolver(() => Picture)
  cover(@Root() { id }: ShopItem): Picture {
    return this.store.getProductCover(id)
  }
}
