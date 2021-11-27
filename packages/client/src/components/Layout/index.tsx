import * as React from "react";
import * as b_ from "b_";
import Helmet from "react-helmet";
import { NavBar } from "../NavBar";
import { SignInButton } from '../SignInButton'

import "./index.scss";
require("rsuite/dist/rsuite.min.css");

const b = b_.with("content");

const Layout: React.FC<{}> = ({ children }) => (
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
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </Helmet>
    <div className={b()}>
      <NavBar />
      {children}
    </div>
    <SignInButton />
  </>
);

export default Layout;
