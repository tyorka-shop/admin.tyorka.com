import * as Types from '../../../types/gql';

export type SaveProductMutationVariables = Types.Exact<{
  product: Types.ProductInput;
}>;


export type SaveProductMutation = { __typename?: 'Mutation', saveProduct?: { __typename?: 'Product', id: string, showInGallery: boolean, showInShop: boolean, coverId?: string | null | undefined, price?: number | null | undefined, title?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined, description?: { __typename?: 'MultiLang', en?: string | null | undefined, ru?: string | null | undefined } | null | undefined, pictures: Array<{ __typename?: 'Picture', id: string, src: string }> } | null | undefined };
