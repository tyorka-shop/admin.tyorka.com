import * as Types from '../../../types/gql';

export type FormFragment = { __typename?: 'Product', id: string, title?: string | null | undefined, showInGallery: boolean, showInShop: boolean, coverId?: string | null | undefined, pictures: Array<{ __typename?: 'Picture', id: string, src: string }> };
