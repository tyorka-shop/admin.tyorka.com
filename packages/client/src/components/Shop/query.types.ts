import * as Types from '../../types/gql';

export type ShopQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ShopQuery = { __typename?: 'Queries', shop: Array<{ __typename?: 'Product', id: string, title: { __typename?: 'MultiLang', ru: string }, cover: { __typename?: 'Picture', id: string, src: string } }> };
