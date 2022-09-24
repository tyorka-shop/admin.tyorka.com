import * as Types from '../../../../types/gql';

export type LogQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type LogQuery = { __typename?: 'Queries', publication?: { __typename?: 'Build', id: string, status: Types.BuildStatus, log: string, date: string } | null | undefined };
