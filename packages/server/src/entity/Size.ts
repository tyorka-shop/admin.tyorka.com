import { Column } from "typeorm";

export class Size {
  @Column()
  width: number;

  @Column()
  height: number;
}
