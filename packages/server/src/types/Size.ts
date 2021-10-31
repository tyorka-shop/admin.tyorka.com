import { Field, Float, ObjectType } from "type-graphql";

@ObjectType()
export class Size {
  @Field(() => Float)
  width: number;

  @Field(() => Float)
  height: number;
}