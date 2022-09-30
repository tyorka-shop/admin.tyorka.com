import * as React from "react";
import b_ from "b_";
import { Grid } from "../Grid";
import { Crop, Size } from "../../types/common";
import { useEditor } from "./hooks";
import { PictureEditorFragment } from "./fragment.types";
import { useImage } from "../../hooks/useImage";

import "./index.scss";

const b = b_.with("picture-editor");

interface Props {
  pic: PictureEditorFragment;
  onChange: (crop: Crop) => void;
}

export const PictureEditor: React.FC<Props> = ({ pic, onChange }) => {
  const {
    container,
    isMoving,
    backgroundPosition,
  } = useEditor(pic.originalSize, pic.crop, onChange);

  const src = useImage(pic.src);

  return (
    <div
      ref={container}
      className={b("image", { moving: isMoving })}
      style={{
        backgroundImage: `url(${src})`,
        ...backgroundPosition,
      }}
    >
      <Grid />
    </div>
  );
};