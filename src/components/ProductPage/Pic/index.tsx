import React from "react";
import b_ from "b_";
import { useImage } from "../../../hooks/useImage";
import { PicFragment } from "./fragment.types";

import "./index.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: PicFragment | undefined;
  isCover: boolean;
  onCoverSelect: () => void;
  onRemove: () => void;
  onCropClick: () => void;
}

const b = b_.with("product-page-pic");

export const Pic: React.FC<Props> = ({
  children,
  isCover,
  onRemove,
  onCoverSelect,
  onCropClick,
  ...props
}) => {
  if (!children) {
    return null;
  }
  const src = useImage(children.src, 'small');
  return (
    <div className={b()}>
      <img src={src} {...props} draggable />
      <div
        onClick={onCoverSelect}
        className={b("cover-btn", { "is-cover": isCover })}
      >
        {isCover ? "is cover" : "select as cover"}
      </div>
      <div onClick={onRemove} className={b("remove")} title="Remove">
        ✖
      </div>
      <div onClick={onCropClick} className={b("crop")} title="Crop">
        crop
      </div>
    </div>
  );
};
