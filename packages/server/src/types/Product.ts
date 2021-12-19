import { Field, Float, ID, InputType, ObjectType } from "type-graphql";
import { ID as IDScalar } from "../types";
import { MultiLang, MultiLangInput } from "./MultiLang";
import { State } from "./State";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: IDScalar;

  @Field(() => State)
  state: State;

  @Field(() => ID, { nullable: true })
  coverId?: IDScalar;

  @Field(() => MultiLang, { nullable: true })
  title?: MultiLang;

  @Field(() => Boolean)
  showInGallery: boolean;

  @Field(() => Boolean)
  showInShop: boolean;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => MultiLang, { nullable: true })
  description?: MultiLang;
}

@InputType()
export class ProductInput {
  @Field(() => ID)
  id: IDScalar;

  @Field(() => State)
  state: State;

  @Field(() => [ID])
  pictures: IDScalar[];

  @Field(() => ID, { nullable: true })
  coverId?: IDScalar;

  @Field(() => MultiLangInput, { nullable: true })
  title?: MultiLangInput;

  @Field(() => Boolean)
  showInGallery: boolean;

  @Field(() => Boolean)
  showInShop: boolean;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => MultiLangInput, { nullable: true })
  description?: MultiLangInput;
}
