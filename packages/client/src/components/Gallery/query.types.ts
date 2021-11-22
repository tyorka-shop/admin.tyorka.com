import * as Types from '../../types/gql';

export type GalleryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GalleryQuery = { __typename?: 'Query', gallery: Array<{ __typename?: 'GalleryItem', id: string, src: string }> };
