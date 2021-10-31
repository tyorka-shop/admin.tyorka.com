import * as Types from '../../types/gql';

export type ProductQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, title?: string | null | undefined, state: Types.State, showInGallery: boolean, showInShop: boolean, coverId?: string | null | undefined, pictures: Array<{ __typename?: 'Picture', id: string, src: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } }, originalSize: { __typename?: 'Size', width: number, height: number } }> } };
