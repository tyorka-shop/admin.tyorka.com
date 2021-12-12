import * as Types from '../../types/gql';

export type PublicationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PublicationsQuery = { __typename?: 'Query', publicationDuration: number, publications: Array<{ __typename?: 'Build', id: string, date: string, status: Types.BuildStatus }> };
