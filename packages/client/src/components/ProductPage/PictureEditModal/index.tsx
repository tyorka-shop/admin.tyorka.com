import * as React from "react";
import * as b_ from "b_";
import { Button, Modal } from "rsuite";
import { PictureEditor } from "../../PictureEditor";
import { PictureEditModalFragment } from './fragment.types'
import { useChangeHandler } from "./hooks";

import "./index.scss";

const b = b_.with("picture-edit-modal");

interface Props {
  picture: PictureEditModalFragment;
  onClose: () => void;
}

export const PictureEditModal: React.FC<Props> = ({
  picture,
  onClose,
}) => {
  const [changed, onChange] = React.useState(picture.crop);
  const { onSave } = useChangeHandler(picture.id);
  return (
    <Modal backdrop open onClose={onClose}>
      <Modal.Body className={b()}>
        <PictureEditor pic={picture} onChange={onChange} />
      </Modal.Body>
      <Modal.Footer className={b("footer")}>
        <Button
          onClick={() => {
            onSave(changed);
            onClose();
          }}
          appearance="primary"
        >
          Ok
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
