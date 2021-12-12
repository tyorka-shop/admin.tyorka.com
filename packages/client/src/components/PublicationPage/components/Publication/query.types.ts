import * as Types from '../../../../types/gql';

export type LogQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type LogQuery = { __typename?: 'Query', publication?: { __typename?: 'Build', id: string, status: Types.BuildStatus, log: string, date: string } | null | undefined };
