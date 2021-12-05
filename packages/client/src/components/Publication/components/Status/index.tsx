import React, { useState } from "react";
import b_ from "b_";
import { useBuildStatus } from "./hooks";

import "./styles.scss";
import { Button } from "rsuite";

const b = b_.with("publication-status");

export const Status: React.FC = () => {
  const { status, log } = useBuildStatus();
  const [isLogVisible, setLogVisible] = useState(false);
  return (
    <>
      <div className={b({ [status || '']: true })}>Status: {status}</div>
      <div>
        <Button
          className={b("vis-button")}
          onClick={() => setLogVisible((vis) => !vis)}
          size='sm'
        >
          {isLogVisible ? "˄" : "˅"}
        </Button>
        {isLogVisible && <pre className={b("log")}>{log}</pre>}
      </div>
    </>
  );
};
