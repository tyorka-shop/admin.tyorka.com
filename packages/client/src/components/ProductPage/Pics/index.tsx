import React from "react";
import * as b_ from "b_";
import { Uploader } from "rsuite";
import { Picture } from "../../../types";
import { useDrag } from "../../../hooks/useDrag";
import { Pic } from "../Pic";
import { PicFragment } from "../Pic/fragment.types";

import "./index.scss";

const b = b_.with("product-page-pics");

interface Props {
  children: PicFragment[];
  onAdd: (pic: Picture) => void;
  onRemove: (id: string) => void;
  coverId: string | undefined | null;
  onCoverSelect: (id: string) => void;
  onCropClick: (id: string) => void;
  onReorderPics: (ids: string[]) => void;
}

export const Pics: React.FC<Props> = ({
  children,
  onRemove,
  onAdd,
  coverId,
  onCoverSelect,
  onCropClick,
  onReorderPics,
}) => {
  const { order, dragStart, dragEnd, picked, dragEnter } =
    useDrag(children.map(pic => pic.id), onReorderPics);

  return (
    <div className={b()}>
      <div className={b("list")}>
        {order.map((id) => (
          <Pic
            key={id}
            data-id={id}
            onRemove={() => onRemove(id)}
            isCover={coverId === id}
            onCoverSelect={() => onCoverSelect(id)}
            onCropClick={() => onCropClick(id)}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDragEnter={dragEnter}
            isPicked={id === picked}
          >
            {children.find(pic => pic.id === id)!}
          </Pic>
        ))}
      </div>
      <div className={b("uploader")}>
        <Uploader
          action="//localhost:3000/upload"
          draggable
          onSuccess={onAdd}
          multiple
          accept='image/jpeg,image/png,image/jpg'
        >
          <div>Drag pictures here</div>
        </Uploader>
      </div>
    </div>
  );
};
