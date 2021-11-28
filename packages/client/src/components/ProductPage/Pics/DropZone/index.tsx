import React from "react";
import b_ from "b_";
import './index.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  picked: string | undefined;
  hovered: string | undefined;
}

const b = b_.with("product-page-pics-dropzone");

export const DropZone: React.FC<Props> = ({
  id,
  picked,
  hovered,
  ...props
}) => (
  <div
    className={b({
      active: !!picked,
      hovered: id === hovered && hovered !== picked,
    })}
    key={`${id}-drop-zone`}
    data-id={id}
    {...props}
  />
);
