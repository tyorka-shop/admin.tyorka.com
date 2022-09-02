import * as Types from '../../types/gql';

export type ShopQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ShopQuery = { __typename?: 'Query', shop: Array<{ __typename?: 'ShopItem', id: string, title?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined, cover: { __typename?: 'Picture', id: string, src: string } }> };

export type ItemFragment = { __typename?: 'ShopItem', id: string, title?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined, cover: { __typename?: 'Picture', id: string, src: string } };
