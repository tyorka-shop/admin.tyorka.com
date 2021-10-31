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
    const product = this.store.getProduct(id);
    if (!product) {
      throw new Error("Can not find product");
    }

    return product.pictures
      .map((id) => this.store.getPicture(id))
      .filter(Boolean) as Picture[];
  }

  @FieldResolver(() => Picture, {nullable: true})
  cover(@Root() { id }: Product): Picture | undefined {
    const product = this.store.getProduct(id);
    if (!product) {
      throw new Error("Can not find product");
    }

    return product.coverId && this.store.getPicture(product.coverId)
  }
}
