import React from "react";
import b_ from "b_";
import ReactMarkdown from "react-markdown";
import { Panel } from "rsuite";

import "./index.scss";
import { Textarea } from "../../../Textarea";

const b = b_.with("product-page-preview");

interface Props {
  children: string;
}

export const Preview: React.FC<Props> = ({ children }) => {
  return (
    <div className={b()}>
      <Panel
        header={<div className={b("head")}>Preview</div>}
        collapsible
        bordered
      >
        <ReactMarkdown>{children}</ReactMarkdown>
      </Panel>
    </div>
  );
};
