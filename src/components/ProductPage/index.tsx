import * as React from "react";
import { Loader } from "rsuite";
import { RouteComponentProps } from "@reach/router";
import { useProduct } from "./hooks";
import { ProductForm } from "./Form";
import { PictureEditModal } from "./PictureEditModal";

import "./index.scss";

interface Props extends RouteComponentProps {
  id?: string;
}

export interface FormValues {
  title: string;
}

export const ProductPage: React.FC<Props> = ({ id }) => {
  const { product, loading, addPic, removePic, setCover, reorderPics } =
    useProduct(id);
  const [pictureIdToEdit, setPictureToEdit] = React.useState<string | null>(
    null
  );

  if (loading || !product) {
    return <Loader />;
  }

  return (
    <div>
      <ProductForm
        product={product}
        onPictureAdd={addPic}
        onPictureRemove={removePic}
        onCoverSelect={setCover}
        onCropClick={(id: string) => setPictureToEdit(id)}
        onReorderPics={reorderPics}
      />
      {pictureIdToEdit && (
        <PictureEditModal
          id={pictureIdToEdit}
          onClose={() => setPictureToEdit(null)}
        />
      )}
    </div>
  );
};
