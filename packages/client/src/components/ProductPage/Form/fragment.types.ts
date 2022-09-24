import * as Types from '../../../types/gql';

export type FormFragment = { __typename?: 'Product', id: string, showInGallery: boolean, showInShop: boolean, price?: number | null | undefined, title: { __typename?: 'MultiLang', en: string, ru: string }, cover: { __typename?: 'Picture', id: string }, description: { __typename?: 'MultiLang', en: string, ru: string }, pictures: Array<{ __typename?: 'Picture', id: string, src: string }> };
