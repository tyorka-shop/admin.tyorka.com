import { Field, ObjectType } from "type-graphql";
import { BuildStatus } from "./BuildStatus";
import { Build as BuildEntity} from '../entity/Build'

@ObjectType()
export class Build {
  @Field()
  id: string
  
  @Field(() => BuildStatus)
  status: BuildStatus;

  @Field()
  log: string

  @Field(() => String)
  date: number

  duration?: number

  constructor(value: Build) {
    Object.assign(this, value)
  }

  static fromEntity(build: BuildEntity){
    return new this({
      ...build,
      date: +new Date(build.date),
      log: build.log.replace(/\x1b\[(2K|1A|G)/g, '')
    })
  }
}
