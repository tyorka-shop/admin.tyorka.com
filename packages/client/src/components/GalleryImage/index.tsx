import * as React from "react";
import b_ from "b_";
import { useImage } from "../../hooks/useImage";

import "./index.scss";

const b = b_.with("gallery-image");

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  src: string | undefined;
}

export const GalleryImage: React.FC<Props> = ({ src, ...props }) => {
  if (!src) {
    return null;
  }

  return (
    <div className={b()}>
      <img className={b("img")} src={useImage(src)} {...props} />
    </div>
  );
};
