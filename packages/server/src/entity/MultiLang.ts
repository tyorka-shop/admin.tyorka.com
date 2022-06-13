import { Column } from "typeorm";

export class MultiLang {
  @Column()
  ru: string;

  @Column()
  en: string;
}
