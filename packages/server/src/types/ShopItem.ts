import { Field, Float, ID, ObjectType } from "type-graphql";
import { Product } from "../entity/Product";
import { ID as IDScalar } from "../types";
import { MultiLang } from "./MultiLang";

@ObjectType()
export class ShopItem {
  @Field(() => ID)
  id: IDScalar;

  coverId?: string

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
      id: product.id,
      coverId: product.cover?.id,
      title: product.title,
      description: product.description,
      price: product.price!
    })
  }
}
