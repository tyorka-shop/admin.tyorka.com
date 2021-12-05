import { useQuery } from "@apollo/client";
import { BuildStatus } from "../../../../types/gql";
import * as query from "./query.gql";
import { CurrentBuildQuery } from "./query.types";

export const useBuildStatus = () => {
  const { data, stopPolling } = useQuery<CurrentBuildQuery>(query, {
    pollInterval: 1_000
  });

  const status = data?.currentBuild.status;

  if(status === BuildStatus.Done || status === BuildStatus.Failure) {
    stopPolling();
  }

  return {
    log: data?.currentBuild.log || '',
    status,
  }
};
