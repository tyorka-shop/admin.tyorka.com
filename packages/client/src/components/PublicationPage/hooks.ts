import { useQuery } from '@apollo/client'
import * as query from "./query.gql";
import { PublicationsQuery } from "./query.types";

export const useList = () => {
  const {data} = useQuery<PublicationsQuery>(query);

  return {
    list: data?.publications || [],
    maxDuration: data?.publicationDuration || 60_000
  }
}