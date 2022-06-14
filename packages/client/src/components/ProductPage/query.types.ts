import * as Types from '../../types/gql';

export type ProductQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, state: Types.State, showInGallery: boolean, showInShop: boolean, price?: number | null | undefined, title?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined, pictures: Array<{ __typename?: 'Picture', id: string, src: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } }, originalSize: { __typename?: 'Size', width: number, height: number } }>, cover?: { __typename?: 'Picture', id: string } | null | undefined, description?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined } };
