import React from "react";
import b_ from "b_";
import { Uploader } from "rsuite";
import { Picture } from "../../../types";
import { useDrag } from "../../../hooks/useDrag";
import { Pic } from "../Pic";
import { PicFragment } from "../Pic/fragment.types";
import { useConfig } from "../../../hooks/useConfig";
import { useDropzone } from './hooks'

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
  
  const { backendUrl } = useConfig()

  const { isExpanded } = useDropzone()

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
          >
            {children.find(pic => pic.id === id)}
          </Pic>
        ))}
      </div>
      <div className={b("uploader", {active: isExpanded})}>
        <Uploader
          action={`${backendUrl}/upload`}
          draggable
          onSuccess={onAdd}
          multiple
          accept='image/jpeg,image/png,image/jpg'
          withCredentials

        >
          <div>Drag pictures here</div>
        </Uploader>
      </div>
    </div>
  );
};
