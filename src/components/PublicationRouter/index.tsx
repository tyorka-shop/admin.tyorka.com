import React from "react";
import { Router } from "@reach/router";
import { PublicationPage } from "../PublicationPage";

export const PublicationRouter: React.FC = () => (
  <Router basepath="/publication">
    <PublicationPage path="/" />
  </Router>
);
