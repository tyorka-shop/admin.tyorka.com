import * as Types from '../../types/gql';

export type SaveGalleryOrderMutationVariables = Types.Exact<{
  list: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type SaveGalleryOrderMutation = { __typename?: 'Mutation', saveGalleryOrder: Array<{ __typename?: 'Product', id: string }> };
