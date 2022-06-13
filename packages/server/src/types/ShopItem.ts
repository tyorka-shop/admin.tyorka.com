import { Field, Float, ID, ObjectType } from "type-graphql";
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
}
