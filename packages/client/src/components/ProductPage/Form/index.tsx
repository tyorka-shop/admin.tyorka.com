import * as React from "react";
import * as b_ from "b_";
import { Form, Button, ButtonToolbar } from "rsuite";
import { Form as RForm } from "react-final-form";
import { Picture } from "../../../types";
import { Input } from "../../Input";
import { Checkbox } from "../../Checkbox";
import { Pics } from "../Pics";
import { useSubmit } from "./hooks";
import { FormFragment } from './fragment.types'

import "./index.scss";

const b = b_.with("product-page-form");

interface Props {
  product: FormFragment;
  onPictureAdd: (pic: Picture) => void;
  onPictureRemove: (id: string) => void;
  onCoverSelect: (id: string) => void;
  onCropClick: (id: string) => void;
}

export interface FormValues {
  title: string;
  showInGallery: boolean;
  showInShop: boolean;
}

export const ProductForm: React.FC<Props> = ({
  product,
  onPictureAdd,
  onPictureRemove,
  onCoverSelect,
  onCropClick,
}) => {
  const { onSubmit } = useSubmit(product);

  return (
    <RForm<FormValues>
      initialValues={{
        title: product.title || undefined,
        showInGallery: product.showInGallery || false,
        showInShop: product.showInShop || false,
      }}
      onSubmit={(values) => onSubmit(values)}
      render={({ handleSubmit }) => (
        <Form onSubmit={(checkStatus, e) => handleSubmit(e)}>
          <Form.Group>
            <Form.ControlLabel>Title</Form.ControlLabel>
            <Input name="title" />
          </Form.Group>
          <Form.Group>
            <Checkbox name="showInGallery" title="Show in gallery" />
          </Form.Group>
          <Form.Group>
            <Checkbox name="showInShop" title="Show in shop" />
          </Form.Group>
          <Form.Group>
            <Pics
              onAdd={onPictureAdd}
              onRemove={onPictureRemove}
              coverId={product.coverId}
              onCoverSelect={onCoverSelect}
              onCropClick={onCropClick}
            >
              {product.pictures}
            </Pics>
            <ButtonToolbar>
              <Button appearance="primary" type="submit">
                Submit
              </Button>
            </ButtonToolbar>
          </Form.Group>
        </Form>
      )}
    />
  );
};
