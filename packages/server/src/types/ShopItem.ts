import { Field, Float, ID, ObjectType } from "type-graphql";
import { ID as IDScalar } from "../types";

@ObjectType()
export class ShopItem {
  @Field(() => ID)
  id: IDScalar;

  @Field(() => String)
  title: string
  
  @Field(() => Float)
  price: number

  @Field(() => String, {nullable: true})
  description?: string
}
