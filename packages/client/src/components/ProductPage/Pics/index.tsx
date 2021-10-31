import React from "react";
import * as b_ from "b_";
import { Uploader } from "rsuite";
import { Picture } from "../../../types";
import { Pic } from "../Pic";
import { PicFragment } from '../Pic/fragment.types'

import "./index.scss";

const b = b_.with("product-page-pics");

interface Props {
  children: PicFragment[];
  onAdd: (pic: Picture) => void;
  onRemove: (id: string) => void;
  coverId: string | undefined | null;
  onCoverSelect: (id: string) => void;
  onCropClick: (id: string) => void
}

export const Pics: React.FC<Props> = ({
  children,
  onRemove,
  onAdd,
  coverId,
  onCoverSelect,
  onCropClick
}) => (
  <div className={b()}>
    <div className={b("list")}>
      {children.map((pic) => (
        <Pic
          key={pic.id}
          onRemove={() => onRemove(pic.id)}
          isCover={coverId === pic.id}
          onCoverSelect={() => onCoverSelect(pic.id)}
          onCropClick={() => onCropClick(pic.id)}
        >
          {pic}
        </Pic>
      ))}
    </div>
    <div className={b("uploader")}>
      <Uploader action="//localhost:3000/upload" draggable onSuccess={onAdd}>
        <div>Drag pictures here</div>
      </Uploader>
    </div>
  </div>
);
