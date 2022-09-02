import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class ShopOrder {
  @PrimaryColumn()
  productId: string;

  @Column()
  index: number;
  
  constructor(value: ShopOrder) {
    Object.assign(this, value);
  }
};
