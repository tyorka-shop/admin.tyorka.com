import { Field, ID, ObjectType } from "type-graphql";
import { v4 as uuid } from "uuid";
import { ID as IDScalar } from "../types";
import { Crop } from "./Crop";
import { Size } from "./Size";

@ObjectType()
export class Picture {
  @Field(() => ID)
  id: IDScalar;

  @Field(() => String)
  src: string;

  @Field(() => Size)
  originalSize: Size;

  @Field(() => Crop)
  crop: Crop;

  @Field(() => String)
  color: string;

  constructor(pic: Picture){
    Object.assign(this, pic);
  }

  static create(filename: string, size: Size, color: string) {
    return new this({
      id: uuid(),
      src: filename,
      color,
      originalSize: size,
      crop: getCrop(size),
    })
  }
}

const getCrop = (size: Size): Crop => {
  if(size.width <= size.height || size.height === 0) {
    return {
      anchor: {x: 0, y: 0},
      factor: 100
    }
  }

  const ratio = size.width / size.height;
  return {
    anchor: {x: -(ratio - 1)/2, y: 0},
    factor: ratio * 100
  }
}