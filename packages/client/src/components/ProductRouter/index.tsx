import { Router } from "@reach/router";
import React from "react";
import { ProductPage } from "../ProductPage";
import { Products } from "../Products";
import { Gallery } from "../Gallery";
import { Shop } from '../Shop'

export const ProductRouter: React.FC = () => (
  <>
    <Router basepath="/products">
      <Products path="/" />
      <ProductPage path="/add" />
      <ProductPage path="/:id" />
    </Router>
    <Router basepath="/gallery">
      <Gallery path="/" />
    </Router>
    <Router basepath="/shop">
      <Shop path='/' />
    </Router>
  </>
);
