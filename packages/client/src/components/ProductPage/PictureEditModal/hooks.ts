import { useMutation } from '@apollo/client';
import { SaveCropMutation as Mutation, SaveCropMutationVariables as Variables} from './mutatiion.types'
import * as mutation from './mutatiion.gql';
import { Crop } from '../../../types/common';

export const useChangeHandler = (id: string) => {
  const [ save, {loading}] = useMutation<Mutation, Variables>(mutation);

  const onSave = (crop: Crop) => {
    save({
      variables: {
        id,
        crop
      }
    })
  }

  return {
    onSave
  }
}