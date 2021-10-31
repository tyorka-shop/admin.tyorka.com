import * as React from "react";
import * as b_ from "b_";
import { Link } from "gatsby";

import "./index.scss";

const b = b_.with("add-product-btn");

export const AddProductButton: React.FC = () => (
  <Link className={b()} to="/products/add">+</Link>
);
