import * as Types from '../../../types/gql';

export type PictureQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type PictureQuery = { __typename?: 'Queries', picture?: { __typename?: 'Picture', id: string, src: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } }, originalSize: { __typename?: 'PictureSize', width: number, height: number } } | null | undefined };
