import { Column } from 'typeorm'
import { Point } from "./Point";

export class Crop {
  @Column(() => Point)
  anchor: Point;

  @Column()
  factor: number;
}
