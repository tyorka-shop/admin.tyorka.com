import * as Types from '../../../types/gql';

export type ProductCardCoverFragment = { __typename?: 'Picture', id: string, src: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } } };
