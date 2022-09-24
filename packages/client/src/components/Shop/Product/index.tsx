import React from "react";
import b_ from "b_";
import { ItemFragment } from "./fragment.types";
import { useImage } from "../../../hooks/useImage";

import './index.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  product: ItemFragment;
}

const b = b_.with("shop-product");

export const ProductView: React.FC<Props> = ({
  product: { title, cover },
  ...props
}) => {
  const source = useImage(cover.src, "big", true);

  return (
    <div className={b()}>
      <img src={source} className={b("photo")} {...props}/>
      <div className={b("title")}>{title?.ru}</div>
    </div>
  );
};
