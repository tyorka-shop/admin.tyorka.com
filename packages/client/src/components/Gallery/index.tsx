import * as React from "react";
import * as b_ from "b_";
import { Button, Loader } from "rsuite";
import { RouteComponentProps } from "@reach/router";
import { useDrag } from "../../hooks/useDrag";
import { useGallery } from "./hooks";
import { GalleryImage } from "../GalleryImage";

import "./index.scss";

const b = b_.with("gallery");

interface Props extends RouteComponentProps {}

export const Gallery: React.FC<Props> = () => {
  const { loading, gallery, onSave } = useGallery();

  const { order, dragStart, dragEnd, dragEnter } = useDrag(
    gallery.map((pic) => pic.id)
  );

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <section className={b()}>
        {order
          .map((id) => gallery.find((pic) => pic.id === id)!)
          .map(({ id, cover }) => (
            <GalleryImage
              key={id}
              src={cover?.src}
              data-id={id}
              onDragEnter={dragEnter}
              onDragStart={dragStart}
              onDragEnd={dragEnd}
            />
          ))}
      </section>
      <Button appearance="primary" onClick={() => onSave(order)}>
        Save
      </Button>
    </div>
  );
};
