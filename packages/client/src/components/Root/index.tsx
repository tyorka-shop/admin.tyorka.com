import React from "react";
import { ProductRouter } from "../ProductRouter";
import { LoginRouter } from "../LoginRouter";
import { Layout } from "../Layout";

export const Root: React.FC = () => (
  <Layout>
    <LoginRouter />
    <ProductRouter />
  </Layout>
);
