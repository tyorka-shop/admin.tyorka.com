import { Router } from "@reach/router";
import React from "react";
import { ProductPage } from "../ProductPage";
import { Products } from "../Products";

export const ProductRouter: React.FC = () => (
  <Router basepath="/products">
    <Products path="/" />
    <ProductPage path="/add" />
    <ProductPage path="/:id" />
  </Router>
);
