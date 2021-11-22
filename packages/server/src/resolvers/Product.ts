import { FieldResolver, Resolver, Root } from "type-graphql";
import { Inject, Service } from "typedi";
import { Store } from "../store";
import { Picture } from "../types/Picture";
import { Product } from "../types/Product";

@Service()
@Resolver(Product)
export class ProductResolver {
  @Inject(() => Store)
  private store: Store;

  @FieldResolver(() => [Picture])
  pictures(@Root() { id }: Product): Picture[] {
    return this.store.getProductPictures(id)
  }

  @FieldResolver(() => Picture)
  cover(@Root() { id }: Product): Picture {
    return this.store.getProductCover(id)
  }
}
