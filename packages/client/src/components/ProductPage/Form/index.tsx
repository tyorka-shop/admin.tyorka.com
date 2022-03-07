import * as React from "react";
import { Form, Button, ButtonToolbar } from "rsuite";
import { Form as RForm } from "react-final-form";
import ReactMarkdown from "react-markdown";
import b_ from "b_";
import { Picture } from "../../../types";
import { Input } from "../../Input";
import { Textarea } from "../../Textarea";
import { Checkbox } from "../../Checkbox";
import { createValidator, required } from "../../../libs/validation";
import { Pics } from "../Pics";
import { useSubmit } from "./hooks";
import { FormFragment } from "./fragment.types";

import "./index.scss";
import { Preview } from "./Previce";

const b = b_.with("product-page-form");

interface Props {
  product: FormFragment;
  onPictureAdd: (pic: Picture) => void;
  onPictureRemove: (id: string) => void;
  onCoverSelect: (id: string) => void;
  onCropClick: (id: string) => void;
  onReorderPics: (ids: string[]) => void;
}

export interface FormValues {
  titleRu: string;
  titleEn: string;
  price: number;
  showInGallery: boolean;
  showInShop: boolean;
  descriptionRu: string;
  descriptionEn: string;
}

const validate = createValidator<FormValues>({
  titleEn: [required()],
  titleRu: [required()],
});

export const ProductForm: React.FC<Props> = ({
  product,
  onPictureAdd,
  onPictureRemove,
  onCoverSelect,
  onCropClick,
  onReorderPics,
}) => {
  const { onSubmit } = useSubmit(product);

  return (
    <RForm<FormValues>
      initialValues={{
        titleRu: product.title?.ru || undefined,
        titleEn: product.title?.en || undefined,
        showInGallery: product.showInGallery || false,
        showInShop: product.showInShop || false,
        price: product.price || undefined,
        descriptionRu: product.description?.ru || undefined,
        descriptionEn: product.description?.en || undefined,
      }}
      validate={validate}
      onSubmit={(values) => onSubmit(values)}
      render={({ handleSubmit, values }) => (
        <Form onSubmit={(checkStatus, e) => handleSubmit(e)}>
          <Form.Group>
            <Form.ControlLabel>Title [ru]</Form.ControlLabel>
            <Input name="titleRu" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Title [en]</Form.ControlLabel>
            <Input name="titleEn" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Price</Form.ControlLabel>
            <Input name="price" />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description [ru]</Form.ControlLabel>
            <Textarea name="descriptionRu" style={{ width: "100%" }} rows={8} />
            <Preview>{values.descriptionRu}</Preview>
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Description [en]</Form.ControlLabel>
            <Textarea name="descriptionEn" style={{ width: "100%" }} rows={8} />
            <Preview>{values.descriptionEn}</Preview>
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
              onReorderPics={onReorderPics}
            >
              {product.pictures}
            </Pics>
            <ButtonToolbar className={b("submit")}>
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
