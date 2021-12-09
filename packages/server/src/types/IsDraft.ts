import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class isDraft {
  @Field(() => Boolean)
  isDraft: boolean
}
