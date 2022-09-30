import * as React from "react";
import { Link } from "@reach/router";
import b_ from "b_";
import { Cover } from "./Cover";
import { ProductCardFragment } from './fragment.types'

import "./index.scss";

const b = b_.with("product-card");

interface Props {
  product: ProductCardFragment;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const cover = product.cover?.id
    ? product.pictures.find(({ id }) => product.cover?.id === id)
    : undefined;

  return (
    <Link to={`/products/${product.id}`} className={b()}>
      <Cover picture={cover} />
      <div className={b("title")}>{product.title?.ru}</div>
    </Link>
  );
};
