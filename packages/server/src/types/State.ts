import { registerEnumType } from "type-graphql";

export enum State {
  DRAFT,
  PUBLISHED,
  ARCHIVED,
}

registerEnumType(State, {
  name: "State",
  description: "State of product",
});
