import React from "react";
import { Button } from "rsuite";
import { usePublish } from "./hooks";

interface Props {
  onClick: () => void;
}

export const PublishButton: React.FC<Props> = ({ onClick }) => {
  const { publish, loading } = usePublish(onClick);
  return (
    <Button onClick={publish} loading={loading}>
      Publish
    </Button>
  );
};
