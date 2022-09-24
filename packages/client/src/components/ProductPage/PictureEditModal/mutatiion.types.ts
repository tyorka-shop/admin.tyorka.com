import * as Types from '../../../types/gql';

export type SaveCropMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  crop: Types.CropInput;
}>;


export type SaveCropMutation = { __typename?: 'Mutations', saveCrop: { __typename?: 'Picture', id: string, crop: { __typename?: 'Crop', factor: number, anchor: { __typename?: 'Point', x: number, y: number } } } };
