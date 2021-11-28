import React from "react";
import { Router } from "@reach/router";
import { Login } from "../Login";

export const LoginRouter: React.FC = () => (
  <Router basepath="/login">
    <Login path="/" />
  </Router>
);
