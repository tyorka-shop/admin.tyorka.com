import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class MultiLang {
  @Field(() => String, { nullable: true })
  en?: string;

  @Field(() => String, { nullable: true })
  ru?: string;
}

@InputType()
export class MultiLangInput {
  @Field(() => String, { nullable: true })
  en?: string;

  @Field(() => String, { nullable: true })
  ru?: string;
}