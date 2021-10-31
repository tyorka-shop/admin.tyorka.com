import { Field, Float, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Point {
  @Field(() => Float)
  x: number;

  @Field(() => Float)
  y: number;
}

@InputType()
export class PointInput {
  @Field(() => Float)
  x: number;

  @Field(() => Float)
  y: number;
}