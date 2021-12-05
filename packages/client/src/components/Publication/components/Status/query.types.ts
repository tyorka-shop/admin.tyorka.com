import * as Types from '../../../../types/gql';

export type CurrentBuildQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentBuildQuery = { __typename?: 'Query', currentBuild: { __typename?: 'Build', status: Types.BuildStatus, log: string } };
