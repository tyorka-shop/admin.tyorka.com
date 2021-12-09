import React, { useState } from "react";
import { Button, Progress } from "rsuite";
import b_ from "b_";
import { useBuildStatus } from "./hooks";

import "./styles.scss";
import { BuildStatus } from "../../../../types/gql";

const b = b_.with("publication-status");

export const Status: React.FC = () => {
  const { status, log, percent } = useBuildStatus();
  const [isLogVisible, setLogVisible] = useState(false);
  return (
    <div className={b()}>
      <div className={b("vis-button-wrapper")}>
        <Progress
          percent={percent}
          status={
            status === BuildStatus.Pending
              ? "active"
              : status === BuildStatus.Failure
              ? "fail"
              : "success"
          }
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
