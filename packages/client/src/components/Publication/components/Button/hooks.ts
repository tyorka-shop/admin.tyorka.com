import { useMutation } from '@apollo/client'
import { useEffect } from 'react';
import { BuildStatus } from '../../../../types/gql';
import * as mutattion from './mutation.gql';
import { PublishMutation} from './mutation.types'


export const usePublish = (onClick: (() => void)) => {
  const [publish, {loading, data }] = useMutation<PublishMutation>(mutattion);

  useEffect(() => {
    data?.publish.status === BuildStatus.Pending && onClick()
  }, [data?.publish.status])

  return {
    publish: () => publish(),
    loading,
  }
}