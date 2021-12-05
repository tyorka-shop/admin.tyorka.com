import React from "react";
import { Router } from "@reach/router";
import { Publication } from "../Publication";

export const PublicationRouter: React.FC = () => (
  <Router basepath="/publication">
    <Publication path="/" />
  </Router>
);
