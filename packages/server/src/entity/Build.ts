import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BuildStatus } from "../types/BuildStatus";

@Entity()
export class Build {
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column({ type: "varchar", default: BuildStatus.PENDING })
  status: BuildStatus;

  @Column({ type: 'varchar', default: ''})
  log: string
  
  @CreateDateColumn({ type: "bigint", default: () => "CURRENT_TIMESTAMP" })
  date: Date;

  @Column({nullable: true})
  duration?: number
}
