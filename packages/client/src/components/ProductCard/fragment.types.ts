import * as Types from '../../types/gql';

export type ProductCardFragment = { __typename?: 'Product', id: string, title?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined, pictures: Array<{ __typename?: 'Picture', id: string, src: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } } }>, cover?: { __typename?: 'Picture', id: string } | null | undefined };
