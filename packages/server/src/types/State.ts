import { registerEnumType } from "type-graphql";

export enum State {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(State, {
  name: "State",
  description: "State of product",
});
