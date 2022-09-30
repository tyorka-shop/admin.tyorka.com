import * as Types from '../../types/gql';

export type ProductQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ProductQuery = { __typename?: 'Queries', product?: { __typename?: 'Product', id: string, state: Types.ProductState, showInGallery: boolean, showInShop: boolean, price?: number | null | undefined, title: { __typename?: 'MultiLang', en: string, ru: string }, pictures: Array<{ __typename?: 'Picture', id: string, src: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } }, originalSize: { __typename?: 'PictureSize', width: number, height: number } }>, cover: { __typename?: 'Picture', id: string }, description: { __typename?: 'MultiLang', en: string, ru: string } } | null | undefined };
