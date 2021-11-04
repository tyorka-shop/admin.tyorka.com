import * as React from "react";

export const useDrag = <T extends string>(
  list: T[],
  onChange: (newList: T[]) => void
) => {
  const [picked, setPicked] = React.useState<string | undefined>();
  const [order, setOrder] = React.useState(list);

  React.useEffect(() => {
    setOrder(list);
  }, [list.join(',')]);

  const dragStart = (e: React.DragEvent<HTMLImageElement>) => {
    // @ts-ignore
    setPicked(e.target.dataset.id);
    // @ts-ignore
    e.dataTransfer.effectAllowed = "move";
  };

  const dragEnter = (e: React.DragEvent<HTMLImageElement>) => {
    // @ts-ignore
    if (e.target.dataset.id !== picked) {
      const fromId = picked;
      // @ts-ignore
      const toId = e.target.dataset.id;
      setOrder((previous) => {
        const fromIndex = previous.findIndex((id) => fromId === id);
        const toIndex = previous.findIndex((id) => toId === id);

        const result = [...previous];
        const [item] = result.splice(fromIndex, 1);
        result.splice(toIndex, 0, item);
        return result;
      });
    }
  };

  const dragEnd = () => {
    picked && onChange(order);
    setPicked(undefined);
  };

  return {
    order,
    dragStart,
    dragEnter,
    dragEnd,
    picked,
  };
};
