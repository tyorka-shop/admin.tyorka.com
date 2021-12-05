import { Field, ObjectType } from "type-graphql";
import { BuildStatus } from "./BuildStatus";

@ObjectType()
export class Build {
  @Field(() => BuildStatus)
  status: BuildStatus;

  @Field()
  log: string
}
