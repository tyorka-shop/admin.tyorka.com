import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BlogPost {
  @Field()
  id: string;

  @Field(() => String)
  src: string

  @Field(() => String)
  url: string
  
  @Field(() => String)
  color: string
}
