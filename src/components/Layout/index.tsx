import * as React from "react";
import b_ from "b_";
import Helmet from "react-helmet";
import { NavBar } from "../NavBar";

import "./index.scss";
require("rsuite/dist/rsuite.min.css");

const b = b_.with("content");

export const Layout: React.FC = ({ children }) => (
  <>
    <Helmet title="Admin">
      <html lang="ru" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      />
    </Helmet>
    <div className={b()}>
      <NavBar />
      {children}
    </div>
  </>
);
