import * as Types from '../../types/gql';

export type SaveShopOrderMutationVariables = Types.Exact<{
  list: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type SaveShopOrderMutation = { __typename?: 'Mutations', saveShopOrder: Array<{ __typename?: 'Product', id: string }> };
