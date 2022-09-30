import * as React from "react";
import b_ from "b_";
import { Loader } from "rsuite";
import { RouteComponentProps } from "@reach/router";
import { useProducts } from "./hooks";
import { AddProductButton } from "../AddProductButton";
import { ProductCard } from "../ProductCard";

import "./index.scss";

const b = b_.with("products");

interface Props extends RouteComponentProps {}

export const Products: React.FC<Props> = () => {
  const { loading, products } = useProducts();
  if (loading) {
    return <Loader />;
  }
  return (
    <section className={b()}>
      <AddProductButton />
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};
