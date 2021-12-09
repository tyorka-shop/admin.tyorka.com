import React from "react";
import b_ from "b_";
import { RouteComponentProps } from "@reach/router";
import { PublishButton } from "./components/Button";
import { Status } from "./components/Status";

import "./styles.scss";

const b = b_.with("publication");

interface Props extends RouteComponentProps {}

export const Publication: React.FC<Props> = () => {
  const [isStatusVisible, setStatusVisible] = React.useState(false)
  return (
    <div className={b()}>
      <PublishButton onClick={() => setStatusVisible(true)}/>
      {isStatusVisible && <Status />}
    </div>
  );
};
