import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { MultiLangInput } from "../types/MultiLang";
import { ProductInput } from "../types/Product";
import { State } from "../types/State";
import { MultiLang } from "./MultiLang";
import { Picture } from "./Picture";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", default: State.DRAFT })
  state: State;

  @OneToOne(() => Picture, pic => pic.product)
  @JoinColumn()
  cover: Picture | null;

  @Column(() => MultiLang)
  title: MultiLang;

  @Column({ default: false })
  showInGallery: boolean;

  @Column({ default: false })
  showInShop: boolean;

  @Column({ nullable: true })
  price?: number;

  @Column(() => MultiLang)
  description: MultiLang;

  @OneToMany(() => Picture, (pic) => pic.product, {
    // cascade: true
  })
  pictures: Picture[];

  @CreateDateColumn({ type: "bigint", default: () => "CURRENT_TIMESTAMP" })
  createdAt?: Date;

  @UpdateDateColumn({
    type: "bigint",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date;

  @Column({ nullable: true })
  index?: number;

  constructor(value: Product) {
    Object.assign(this, value);
  }

  static fromProductInput(
    value: Omit<ProductInput, "pictures" | "coverId">,
    pictures: Picture[],
    cover: Picture | null
  ) {
    return new this({
      ...value,
      cover,
      title: defaultMultilang(value.title),
      description: defaultMultilang(value.description),
      pictures,
    });
  }
}

export const defaultMultilang = (value?: MultiLangInput) => {
  return {
    en: value?.en || "",
    ru: value?.ru || "",
  };
};
