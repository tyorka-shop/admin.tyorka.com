import { useMutation } from '@apollo/client'
import * as mutattion from './mutation.gql';
import { PublishMutation} from './mutation.types'


export const usePublish = (onClick: (() => void)) => {
  const [publish, {loading}] = useMutation<PublishMutation>(mutattion);

  return {
    publish: () => {
      publish()
      onClick();
    },
    loading
  }
}