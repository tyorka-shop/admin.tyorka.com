import { Column } from "typeorm";

export class Point {
  @Column()
  x: number;

  @Column()
  y: number;
}
