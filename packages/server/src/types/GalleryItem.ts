import { Field, Float, ID, ObjectType } from "type-graphql";
import { ID as IDScalar } from "../types";

@ObjectType()
export class GalleryItem {
  @Field(() => ID, {description: 'id of product'})
  id: IDScalar;

  @Field(() => String)
  src: string
  
  @Field(() => String)
  color: string

  @Field(() => Float)
  width: number

  @Field(() => Float)
  height: number
}
