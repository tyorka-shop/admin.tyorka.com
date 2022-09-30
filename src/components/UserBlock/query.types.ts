import * as Types from '../../types/gql';

export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Queries', user: { __typename?: 'User', email: string } };
