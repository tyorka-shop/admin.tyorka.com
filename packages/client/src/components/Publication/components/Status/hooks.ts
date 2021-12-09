import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { BuildStatus } from "../../../../types/gql";
import * as query from "./query.gql";
import { CurrentBuildQuery } from "./query.types";

interface Duration {
  start: number;
  end: number;
}

export const useBuildStatus = () => {
  const { data, stopPolling } = useQuery<CurrentBuildQuery>(query, {
    pollInterval: 1_000,
  });

  const status = data?.currentBuild.status;

  if (status === BuildStatus.Done || status === BuildStatus.Failure) {
    stopPolling();
  }

  const [{ start, end }, setDuration] = useState<Duration>({
    start: 0,
    end: 0,
  });

  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (end - start === 0) {
        return;
      }
      const p = (Date.now() - start) / (end - start);
      if (p >= 0 && p <= 1) {
        setPercent(Math.min(p, 0.95));
      }
    }, 500);
    return () => clearInterval(timer)
  }, [start])

  useEffect(() => {
    if (status === BuildStatus.Pending) {
      setDuration({
        start: Date.now(),
        end: Date.now() + 10_000,
      });
    } else {
      setPercent(1);
      setDuration({ start: 0, end: 0 });
    }
  }, [status]);

  return {
    log: data?.currentBuild.log || "",
    status,
    percent: percent * 100,
  };
};
