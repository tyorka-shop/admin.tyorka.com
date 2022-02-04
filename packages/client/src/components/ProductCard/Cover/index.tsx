import * as React from "react";
import b_ from "b_";
import { useRect } from './hooks'
import { ProductCardCoverFragment } from './fragment.types'
import { useImage } from "../../../hooks/useImage";

import "./index.scss";

const b = b_.with("product-card-img");

interface Props {
  picture: ProductCardCoverFragment | undefined;
}

export const Cover: React.FC<Props> = ({ picture }) => {
  const { container, size } = useRect()
  if (!picture) {
    return <div className={b()} />;
  }
  
  const { crop } = picture;

  const src = useImage(picture.src, 'small');

  return (
    <div
      ref={container}
      className={b()}
      style={{
        backgroundImage: `url(${src})`,
        backgroundPositionX: `${crop.anchor.x * size.width}px`,
        backgroundPositionY: `${crop.anchor.y * size.height}px`,
        backgroundSize: `${crop.factor}%`,
      }}
    />
  );
};
