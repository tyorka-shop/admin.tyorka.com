import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class BlogPost {
  @PrimaryColumn()
  id: string;

  @Column()
  src: string

  @Column()
  url: string
  
  @Column()
  color: string
}
