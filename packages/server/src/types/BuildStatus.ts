import { registerEnumType } from "type-graphql";

export enum BuildStatus {
  DONE = 'DONE',
  FAILURE = 'FAILURE',
  PENDING = 'PENDING',
}

registerEnumType(BuildStatus, {
  name: "BuildStatus",
  description: "State of building process",
});
