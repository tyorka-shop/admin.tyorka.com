import React, { useState } from "react";
import { Button, Progress, ProgressLineProps } from "rsuite";
import b_ from "b_";
import moment from "moment";
import { BuildStatus } from "../../../../types/gql";
import { PublicationFragment } from "./fragment.types";
import { useCurrentState } from "./hooks";

import "./styles.scss";

const b = b_.with("publication");

interface Props {
  publication: PublicationFragment;
  maxDuration: number
}

export const Publication: React.FC<Props> = ({ publication, maxDuration }) => {
  const [isLogVisible, setLogVisible] = useState(false);
  const { status, log } = useCurrentState(publication);
  return (
    <div className={b()}>
      <div className={b("vis-button-wrapper")}>
        <div className={b("date")}>
          {moment(publication.date).format("DD.MM.YY HH:ss:mm")}
        </div>
        <Progress
          percent={getPercent(status, +publication.date, maxDuration)}
          status={buildStatusToStatus[status]}
          showInfo={false}
        />
        <Button
          className={b("vis-button")}
          onClick={() => setLogVisible((vis) => !vis)}
          size="sm"
        >
          {isLogVisible ? "▴" : "▾"}
        </Button>
      </div>
      {isLogVisible && <pre className={b("log")}>{log}</pre>}
    </div>
  );
};

const buildStatusToStatus: Record<BuildStatus, ProgressLineProps["status"]> = {
  DONE: "success",
  FAILURE: "fail",
  PENDING: "active",
};

const getPercent = (status: BuildStatus, date: number, maxDuration: number) => {
  if (status === BuildStatus.Pending) {
    return Math.min((Date.now() - date) / maxDuration, 0.95) * 100;
  }
  return 100;
};
