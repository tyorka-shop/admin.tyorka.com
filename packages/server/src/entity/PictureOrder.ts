import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PictureOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  pictureId: string;

  @Column()
  productId: string;

  @Column()
  index: number;
  
  constructor(value: Omit<PictureOrder, 'id'> & {id?: string}) {
    Object.assign(this, value);
  }
};
