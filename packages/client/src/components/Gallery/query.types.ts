import * as Types from '../../types/gql';

export type GalleryQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GalleryQuery = { __typename?: 'Queries', gallery: Array<{ __typename?: 'Product', id: string, cover: { __typename?: 'Picture', id: string, src: string } }> };
