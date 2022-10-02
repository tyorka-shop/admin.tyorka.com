import React, { useState } from "react";
import { Button, Progress, ProgressLineProps, Checkbox } from "rsuite";
import b_ from "b_";
import moment from "moment";
import { BuildStatus } from "../../../../types/gql";
import { PublicationFragment } from "./fragment.types";
import { useCurrentState, useScroll } from "./hooks";

import "./styles.scss";

const b = b_.with("publication");

interface Props {
  publication: PublicationFragment;
  maxDuration: number;
}

export const Publication: React.FC<Props> = ({ publication, maxDuration }) => {
  const [isLogVisible, setLogVisible] = useState(false);
  const { status, log } = useCurrentState(publication);
  const { container, ...checkbox } = useScroll();

  const date = moment.utc(publication.date);

  return (
    <div className={b()}>
      <div className={b("vis-button-wrapper")}>
        <div className={b("date")}>
          {date.local().format("DD.MM.YY HH:mm:ss")}
        </div>
        <Progress
          percent={getPercent(status, +date.toDate(), maxDuration)}
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
      {isLogVisible && (
        <div>
          <pre className={b("log")} ref={container}>
            {log}
          </pre>
          <Checkbox onChange={(_, value) => checkbox.setEnabled(value)} checked={checkbox.enabled}>auto scroll</Checkbox>
        </div>
      )}
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
