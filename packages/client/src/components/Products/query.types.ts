import * as Types from '../../types/gql';

export type ProductsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, coverId?: string | null | undefined, title?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined, pictures: Array<{ __typename?: 'Picture', id: string, src: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } } }> }> };
