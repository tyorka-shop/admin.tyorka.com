import * as React from "react";
import b_ from "b_";
import { Button, Loader } from "rsuite";
import { RouteComponentProps } from "@reach/router";
import { useDrag } from "../../hooks/useDrag";
import { useShop } from "./hooks";
import { ProductView } from './Product'

import "./index.scss";

const b = b_.with("shop");

interface Props extends RouteComponentProps {}

export const Shop: React.FC<Props> = () => {
  const { loading, list, onSave } = useShop();

  const { order, dragStart, dragEnd, dragEnter } = useDrag(
    list.map((pic) => pic.id)
  );

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <div className={b("btn-wrap")}>
        <Button appearance="primary" onClick={() => onSave(order)}>
          Save
        </Button>
      </div>
      <section className={b()}>
        {order
          .map((id) => list.find((pic) => pic.id === id)!)
          .map((product) => (
            <ProductView
              key={product.id}
              product={product}
              data-id={product.id}
              onDragEnter={dragEnter}
              onDragStart={dragStart}
              onDragEnd={dragEnd}
            />
          ))}
      </section>
    </div>
  );
};
