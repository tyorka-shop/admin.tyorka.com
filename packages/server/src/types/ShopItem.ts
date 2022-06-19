import { Field, Float, ID, ObjectType } from "type-graphql";
import { Product } from "../entity/Product";
import { ID as IDScalar } from "../types";
import { MultiLang } from "./MultiLang";
import { Picture } from "./Picture";

@ObjectType()
export class ShopItem {
  @Field(() => ID)
  id: IDScalar;

  @Field(() => Picture, {nullable: true})
  cover?: Picture

  @Field(() => MultiLang, { nullable: true })
  title?: MultiLang;

  @Field(() => Float)
  price: number;

  @Field(() => MultiLang, { nullable: true })
  description?: MultiLang;

  constructor(value: ShopItem){
    Object.assign(this, value)
  }

  static fromEntity(product: Product) {
    return new this({
      ...product,
      cover: product.cover || undefined,
      price: product.price!
    })
  }
}
