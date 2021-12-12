import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { BuildStatus } from "../../../../types/gql";
import * as query from "./query.gql";
import { LogQuery, LogQueryVariables } from './query.types'
import { PublicationFragment } from "./fragment.types";

export const useCurrentState = (publication: PublicationFragment) => {
  const { data, stopPolling, startPolling } = useQuery<LogQuery, LogQueryVariables>(query, {
    variables: {
      id: publication.id
    }
  });

  useEffect(() => {
    if(!data?.publication?.status){
      return;
    }
    if(data?.publication?.status === BuildStatus.Pending) {
      startPolling(1_000)
    }
    else {
      stopPolling()
    }
  }, [data?.publication?.status])

  return {
    status: data?.publication?.status || publication.status,
    log: data?.publication?.log || ''
  }
};
