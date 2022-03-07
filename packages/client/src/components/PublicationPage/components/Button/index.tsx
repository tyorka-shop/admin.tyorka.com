import React from "react";
import { Button } from "rsuite";
import { usePublish } from "./hooks";

export const PublishButton: React.FC = () => {
  const { publish, loading } = usePublish();
  return (
    <Button onClick={publish} loading={loading} appearance='primary'>
      Publish
    </Button>
  );
};
