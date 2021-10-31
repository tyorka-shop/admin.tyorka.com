import { Field, Float, InputType, ObjectType } from "type-graphql";
import { Point, PointInput } from "./Point";

@ObjectType()
export class Crop {
  @Field(() => Point)
  anchor: Point;

  @Field(() => Float)
  factor: number;
}

@InputType()
export class CropInput {
  @Field(() => PointInput)
  anchor: Point;

  @Field(() => Float)
  factor: number;
}