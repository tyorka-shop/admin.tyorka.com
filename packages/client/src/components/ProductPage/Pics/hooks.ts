import React from "react";
export const useDropzone = () => {
  const [isExpanded, setExpanded] = React.useState(false);

  const onDragOver = () => {
    setExpanded(true);
  };

  const onDragEnd = () => {
    setExpanded(false);
  };

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    document.body.addEventListener("dragover", onDragOver);
    document.body.addEventListener("drop", onDragEnd);

    return () => {
      document.body.removeEventListener("dragover", onDragOver);
      document.body.removeEventListener("drop", onDragEnd);
    };
  });

  return {
    isExpanded,
  };
};
