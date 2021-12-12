import React from "react";
import b_ from "b_";
import { RouteComponentProps } from "@reach/router";
import { PublishButton } from "./components/Button";
import { Publication } from "./components/Publication";
import { useList } from "./hooks";

import "./styles.scss";

const b = b_.with("publication");

interface Props extends RouteComponentProps {}

export const PublicationPage: React.FC<Props> = () => {
  const { list, maxDuration } = useList();
  return (
    <div className={b()}>
      <PublishButton />
      {list.map((publication) => (
        <Publication
          key={publication.id}
          publication={publication}
          maxDuration={maxDuration}
        />
      ))}
    </div>
  );
};
