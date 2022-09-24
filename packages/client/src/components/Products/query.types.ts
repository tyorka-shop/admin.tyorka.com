import * as Types from '../../types/gql';

export type ProductsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Queries', products: Array<{ __typename?: 'Product', id: string, title: { __typename?: 'MultiLang', en: string, ru: string }, pictures: Array<{ __typename?: 'Picture', id: string, src: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } } }>, cover: { __typename?: 'Picture', id: string } }> };
