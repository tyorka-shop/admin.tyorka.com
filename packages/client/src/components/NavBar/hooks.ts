import { useQuery } from "@apollo/client";
import * as query from './query.gql';
import { IsDraftQuery } from './query.types'

export const useIsDraft = () => {
  const {data} = useQuery<IsDraftQuery>(query);
  return {
    isDraft: data?.isDraft || false
  }
};
