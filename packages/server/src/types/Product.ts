import { Field, ID, InputType, ObjectType } from "type-graphql";
import { ID as IDScalar } from "../types";
import { State } from "./State";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: IDScalar;

  @Field(() => State)
  state: State;

  @Field(() => ID, {nullable: true})
  coverId?: IDScalar

  @Field(() => String, {nullable: true})
  title?: string
  
  @Field(() => Boolean)
  showInGallery: boolean
  
  @Field(() => Boolean)
  showInShop: boolean
}

@InputType()
export class ProductInput {
  @Field(() => ID)
  id: IDScalar;

  @Field(() => State)
  state: State;

  @Field(() => [ID])
  pictures: IDScalar[]

  @Field(() => ID, {nullable: true})
  coverId?: IDScalar

  @Field(() => String, {nullable: true})
  title?: string
  
  @Field(() => Boolean)
  showInGallery: boolean
  
  @Field(() => Boolean)
  showInShop: boolean
}