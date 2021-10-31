import * as React from "react";
import { Link } from "@reach/router";
import * as b_ from "b_";
import { Cover } from "./Cover";
import { ProductCardFragment } from './fragment.types'

import "./index.scss";

const b = b_.with("product-card");

interface Props {
  product: ProductCardFragment;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const cover = product.coverId
    ? product.pictures.find(({ id }) => product.coverId === id)
    : undefined;

  return (
    <Link to={`/products/${product.id}`} className={b()}>
      <Cover picture={cover} />
      <div className={b("title")}>{product.title}</div>
    </Link>
  );
};
