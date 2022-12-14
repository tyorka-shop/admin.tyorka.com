import * as Types from '../../../../types/gql';

export type PublishMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type PublishMutation = { __typename?: 'Mutations', publish: { __typename?: 'Build', status: Types.BuildStatus, log: string } };
