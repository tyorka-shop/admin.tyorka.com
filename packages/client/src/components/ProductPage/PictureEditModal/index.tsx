import * as React from "react";
import b_ from "b_";
import { Button, Modal } from "rsuite";
import { Loader } from "../../Loader";
import { PictureEditor } from "../../PictureEditor";
import { PictureEditModalFragment } from "./fragment.types";
import { useChangeHandler, usePicture } from "./hooks";

import "./index.scss";

const b = b_.with("picture-edit-modal");

interface Props {
  id: string;
  onClose: () => void;
}

export const PictureEditModal: React.FC<Props> = ({ id, onClose }) => {
  const { picture, loading } = usePicture(id);
  if (loading || !picture) {
    return null;
  }
  return <ModalView picture={picture} onClose={onClose} />;
};

interface ModalProps {
  picture: PictureEditModalFragment;
  onClose: () => void;
}

const ModalView: React.FC<ModalProps> = ({ picture, onClose }) => {
  const [changed, onChange] = React.useState(picture?.crop);
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
