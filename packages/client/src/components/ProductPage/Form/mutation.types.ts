import * as Types from '../../../types/gql';

export type SaveProductMutationVariables = Types.Exact<{
  product: Types.ProductInput;
}>;


export type SaveProductMutation = { __typename?: 'Mutation', saveProduct?: { __typename?: 'Product', id: string, title?: string | null | undefined, showInGallery: boolean, showInShop: boolean, coverId?: string | null | undefined, pictures: Array<{ __typename?: 'Picture', id: string, src: string }> } | null | undefined };
