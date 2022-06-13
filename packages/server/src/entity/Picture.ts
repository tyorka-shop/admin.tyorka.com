import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Crop } from "./Crop";
import { Product } from "./Product";
import { Size } from "./Size";

@Entity()
export class Picture {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  src: string;

  @Column()
  color: string;

  @Column(() => Size)
  originalSize: Size;

  @Column(() => Crop)
  crop: Crop;

  @ManyToOne(() => Product, (product) => product.pictures)
  product?: Product

  constructor(value: Picture) {
    Object.assign(this, value);
  }

  static create(filename: string, size: Size, color: string) {
    return new this({
      id: uuid(),
      src: filename,
      color,
      originalSize: size,
      crop: getCrop(size),
    });
  }
}

const getCrop = (size: Size): Crop => {
  if (size.width <= size.height || size.height === 0) {
    return {
      anchor: { x: 0, y: 0 },
      factor: 100,
    };
  }

  const ratio = size.width / size.height;
  return {
    anchor: { x: -(ratio - 1) / 2, y: 0 },
    factor: ratio * 100,
  };
};
