import * as Types from '../../../types/gql';

export type FormFragment = { __typename?: 'Product', id: string, showInGallery: boolean, showInShop: boolean, price?: number | null | undefined, title?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined, cover?: { __typename?: 'Picture', id: string } | null | undefined, description?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined, pictures: Array<{ __typename?: 'Picture', id: string, src: string }> };
