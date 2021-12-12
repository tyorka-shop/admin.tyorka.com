import { Field, ObjectType } from "type-graphql";
import { v4 as uuid } from "uuid";
import { BuildStatus } from "./BuildStatus";

@ObjectType()
export class Build {
  constructor(b: Build) {
    Object.assign(this, b);
  }

  @Field()
  id: string
  
  @Field(() => BuildStatus)
  status: BuildStatus;

  @Field()
  log: string

  @Field(() => String)
  date: number

  duration: number | undefined

  static create(){
    return new this({
      id: uuid(),
      date: Date.now(),
      status: BuildStatus.PENDING,
      log: '',
      duration: undefined
    })
  }
}
